---
category: "프로그래밍"
sub_category: "Node.js"
series_name: "Node.js 파헤치기"
series_num: 2
title: "Node.js의 이벤트 루프와 비동기"
url: "nodejs-2"
description: "Node.js 비동기 동작을 정리합니다."
tags: ["Node.js", "Javascript", "V8", "EventLoop"]
date: 2020-10-08
update_date: 2020-10-08
---

자바스크립트 V8엔진과 Node.js 런타임을 기반으로 비동기처리가 어떻게 처리되는지

이벤트 루프의 동작방식등을 정리한다.

***

<br>

## 이벤트 루프

이벤트 루프는 콜 스택과 큐를 감시하며 비어있는 콜 스택에 작업을 넣는 작업(Tick)을 수행한다.

MDN의 이벤트 루프의 간이 코드를 통해 `Tick`의 대략적인 동작원리가 설명된다.

```javascript
while(queue.waitForMessage()) {
    queue.processNextMessage();
}
```

`Queue.waitForMessage()`를 통해 작업이 도착할 때까지 **동기적으로** 기다린다.

<span class="callout">
동시에 발생하는 다양항 작업들을 큐에 쌓고 이벤트 루프를 통해 실행하므로써 동시성을 확보하는 것이다.<br>
실제로 작업이 동시에 수행되는 것은 아니다.
</span>

콜 스택에 올라간 작업은 되므로 `Run-to-completion` 으로 동작한다.

<br>

### 구조


>The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
>Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. We'll explain this in further detail later in this topic.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa18ceb6a-f755-409d-b85d-796cdf6da17f%2F_2020-10-08__9.24.43.png?table=block&id=faeb4660-706a-4a26-bd8d-fd4d589eb32f&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

위 Node.js공식문서의 설명처럼 **이벤트 루프**는 시스템 커널에 작업을 넘기므로써 싱글스레드임에도 논블로킹 I/O 작업을 수행한다.
대부분의 현대 커널은 멀티스레드이므로 넘겨받은 다수의 작업을 수행가능하며, 작업이 완료되면 Node.js로 다시 알려주어 콜백을 poll queue에 추가할 수 있도록 한다.

위 구조를 살펴보면

1. Timers

   `setTimeout()`과 `setInterval()`로 스케줄링한 콜백을 실행

2. Pending callbacks

   **close callback**, **Timer로 스케줄링된 콜백**, `setImmediate()`를 제외한 거의 모든 콜백을 실행

3. Idle, prepare

   내부용으로만 사용

4. Poll

   새로운 I/O 이벤트를 가져옴. 적절한 시기에 node는 여기서 블록

5. Check

   `setImmediate()` 콜백 invoke

6. Close callbacks

   e.g: `socket.on(‘close’, ….)`

<br>

### 동작 원리 - callback

ES6 이전 callback함수를 이용한 Node.js의 이벤트 루프는 **Task queue**를 이용하여 작업이 수행되었다.

```javascript
function first(){
    console.log(111)
    second()
}

function second() {
    setTimeout(function cb() {
        console.log(222)
    }, 0)
    third()
}

function third() {
    console.log(333)
}

first() // ????
```

앞서 정리했듯이 각 함수는 콜 스택에 **FILO** 형태로 쌓이고 수행된다.

따라서, 위 함수들의 실행 절차를 살펴보면

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F62757f1a-e8a5-4a5a-b27c-f605094ac97d%2F_2020-10-08__9.43.24.png?table=block&id=d7d26338-f6b4-4e50-bcea-21e076bf9387&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

1. `first()`함수가 실행된 후 `console.log`를 통해 **111**이 출력된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6159026d-4ceb-4d75-8b7e-cafacc06fab0%2F_2020-10-08__9.50.53.png?table=block&id=735040e4-4a9a-4bca-8bbf-0583b8a5a9c0&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

2. `second()`함수가 실행된 후 `setTimeout()`함수는 콜스택에서 바로 빠져나오고 런타임의 **Web API**에게 요청된다.<br>`cb()`함수는 **Task Queue**에 쌓인다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81c0a002-e271-473b-8e37-08d486873f79%2F_2020-10-08__10.01.37.png?table=block&id=368d3819-336d-46da-8aab-b7d50cf1457d&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

3. `third()`함수가 실행되고 `console.log`를 통해 **333**이 출력된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F66cadbe5-d53e-42ef-97b2-9013b516b566%2F_2020-10-08__10.04.03.png?table=block&id=1d90091d-0626-4685-9145-3c294f4da11e&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

4. 모든 함수의 실행이 끝나고 콜 스택이 비워진다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F345bac90-9824-45f4-bd4f-0987dd55fe8c%2F_2020-10-08__10.08.32.png?table=block&id=e9309fa3-66f2-4764-ac49-4780075440a3&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

5. 콜 스택이 비어있는 것을 확인한 **Event Loop**는 **Task Queue**에서 대기하고 있던 `cb()`함수를 콜스택에 담는다.

6. 마지막으로 콜 스택에 담긴 `cb()`함수가 실행되고 `console.log`를 통해 **222**가 실행된다.

```javacript
// 실행결과
111
333
222
```

> **[loupe](http://latentflip.com/loupe)**
>
> 위 사이트에서 대략적인 플로우를 확인해볼 수 있다. (callback 한정)

<br>

### 동작 원리 - promise

ES6의 공개로 Promise함수들이 추가되고 이를 처리하는 `Microtask Queue`의 개념도 추가되었다.

앞서 정리한 Queue의 종류를 바탕으로 이벤트 루프의 동작 순서를 정리해보면

```javascript
function first() {
    console.log(111)
    second()
}

function second() {
    setTimeout(function cb1() {
        console.log(222)
    }, 0)
    third()
}

function third() {
    Promise.resolve()
        .then(function cb2() {
            console.log(333)
        })
    fourth()
}

function fourth() {
    requestAnimationFrame(function cb3() {
        console.log(444)
    })

    fifth()
}

function fifth() {
    console.log(555)
}

first()
```

`setTimeout()` 함수만 사용하는 것이 아니라 `Promise().resolve()`와 `requestAnimationFrame()`함수를 이용하여

동작시켜보면 동작순서는

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7f453d4b-b79e-4f09-991d-23d4ccae9d8b%2F_2020-10-08__10.52.24.png?table=block&id=fda38e03-9487-4a1a-aa83-d6ba2813e98f&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

1. `first()`함수가 실행된 후 `console.log`를 통해 **111**이 출력된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fab5617fe-c530-4925-8ad0-4627f3fd95e8%2F_2020-10-08__10.56.25.png?table=block&id=5c636bcf-b3f8-4456-8472-31a4d71c1891&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

2. `second()`함수가 실행된 후 `setTimeout()`함수는 콜스택에서 바로 빠져나오고 런타임의 **Web API**에게 요청된다. `cb1()`함수는 **Task Queue**에 쌓인다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F35700cf8-122d-42a0-9b81-a509a3973c5b%2F_2020-10-08__10.59.04.png?table=block&id=b8a174b3-f790-4d40-9044-54aa235a56c6&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

3. `third()`함수가 실행된 후 `Promise()`함수는 콜스택에서 바로 빠져나오고 런타임의 **Web API**에게 요청된다. `then()`함수는 **Microtask Queue**에 쌓인다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff539d18d-a83b-4ba4-9bb7-3952fed1eceb%2F_2020-10-08__11.01.58.png?table=block&id=64cf1ffa-5643-47de-b61b-d74aa3e6268d&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

4. `fourth()`함수가 실행된 후 `requestAnimationFrame()`함수는 콜스택에서 바로 빠져나오고 런타임의 **Web API**에게 요청된다. `cb3()`함수는 **Animation frames**에 쌓인다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d37e7fd-ba78-4bea-a260-e99f8779e499%2F_2020-10-08__11.04.42.png?table=block&id=ad16c375-1b7c-4b27-8fb2-ab0c6246ceaf&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

5. `fifth()`함수가 실행되고 `console.log`를 통해 **555**이 출력된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa8697155-0f91-4ee3-8eb3-3832c24cb1e4%2F_2020-10-08__11.08.21.png?table=block&id=8686f66e-d096-43cd-9ec5-36e720dfbcaf&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

6. 모든 함수의 실행이 끝나고 콜스택에서 한개씩 **pop**된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7ed55ffa-8ee0-4b76-96c6-b0e411bddbcd%2F_2020-10-08__11.13.53.png?table=block&id=d4b78f3e-5432-486e-8740-71533c34f6b0&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2
)

7. 콜 스택이 비어있는 것을 확인한 **Event Loop**는 **Microtask Queue**에서 대기하고 있던 `then()`함수를 콜스택에 담는다.

8. `then()`함수가 실행되고 `console.log`를 통해 **333**가 실행된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff26a1712-b994-4221-9fc9-d56a7e1a76ea%2F_2020-10-08__11.22.09.png?table=block&id=2b6c04fd-22d5-4c54-877e-bbd50d8f85ab&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

9. 콜 스택이 비어있는 것을 확인한 **Event Loop**는 **Animation frames**에서 대기하고 있던 `cb3()`함수를 콜스택에 담는다.

10. `cb3()`함수가 실행되고 `console.log`를 통해 **444**가 실행된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9a3089da-4bfc-49c4-8cf7-ef511cbe4c7f%2F_2020-10-08__11.23.22.png?table=block&id=9670a9b2-9798-4356-8aff-8dcc7d95dc74&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

11. 콜 스택이 비어있는 것을 확인한 **Event Loop**는 **Task Queue**에서 대기하고 있던 `cb1()`함수를 콜스택에 담는다.

12. 마지막으로 콜 스택에 담긴 `cb1()`함수가 실행되고 `console.log`를 통해 **222**가 실행된다.


```javacript
// 실행결과
111
555
333
444
222
```

> **[tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)**
>
> 위 사이트에서 대략적인 플로우를 확인해볼 수 있다.

<br>

### Summary

Queue의 호출순서 우선순위는 **Microtask Queue > Animation Frames > Task Queue** 순이다.

<span class="callout">
이러한 동작들은 브라우저마다 호출 순서가 다를 가능성이 있다. Promise의 처리방식이 브라우저 별로 다르기 때문이다.
</span>

<br>

<span class="callout">
setTimeout함수의 경우 `delay` 파라미터를 통해 딜레이를 조절할 수 있다. <br>
하지만 위와 같은 플로우를 통해 작업이 진행되므로 약간의 오차가 발생한다.
</span>

위 플로우를 충분히 이해하고 본다면 가장 눈에 잘들어오는 아키텍처는 아래와 같다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fce9951af-bea8-44a4-ab88-ed5a8be133cb%2Fnodejs.jpg?table=block&id=9012861c-5909-479b-b25f-933ad303110d&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## Reference

<span class="reference">

[Node.js Doc: EventLoop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[MDN: EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

[[JS] Javascript의 Event Loop](https://asfirstalways.tistory.com/362)

[[Javascript] 자바스크립트의 호출 스택과 이벤트 루프](https://iamsjy17.github.io/javascript/2019/07/20/how-to-works-js.html)

[nodejs의 내부 동작 원리 (libuv, 이벤트루프, 워커쓰레드, 비동기)](https://sjh836.tistory.com/149)

</span>
