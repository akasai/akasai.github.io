---
category: "개발/Node.js"
series: 3
title: "Node.js 동작 원리"
url: "nodejs-3"
description: "Node.js Non-Blocking, AIO에 대해 알아봅니다."
tags: ["Node.js", "Javascript", "V8", "Non-Blocking", "Async I/O", "libuv"]
date: 2020-10-12
update_date: 2020-10-12
---

기본적인 Node.js의 비동기 처리에 대하여 정리해보았다.

비동기 처리에 있어서 단골로 등장하는 키워드인 `Non-Blocking`을 정리해보려고 한다.

***

<br>

## 정의

### 동기(Sync) / 비동기(Async)

   처리해야 할 작업들에 대한 <span class="em red">처리과정</span>.

   두 가지 이상의 작업과 이를 처리하는 시간으로 구분한다.

   1. **Synchronous**
   
      호출된 작업의 리턴하는 시간과 결과를 반환하는 시간이 일치하는 경우를 말한다.

      작업 `A`의 종료시간과 작업 `B`의 시작시간이 같으면 <span class="em red">동기적</span>이라고 한다.

      ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2437055-8faf-4826-9f4e-16555c21da33%2F_2020-10-12__2.56.45.png?table=block&id=3af5da26-38ab-4c2d-b9d8-53fc7ea36707&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

   2. **Asynchronous**
   
      호출된 작업의 리턴하는 시간과 결과를 반환하는 시간이 일치하지 않는 경우를 말한다.

      동기와 반대로 대상이 작업시간이 같지 않을 때 <span class="em red">비동기적</span>이라고 본다.

      ![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F730bdffc-4d77-403d-a082-f8a535d362e2%2F_2020-10-12__3.01.57.png?table=block&id=6d35cd62-fb46-433b-8b01-2f635b390192&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

   위 두가지 경우를 극단적인 예를 들어 설명하자면 `작업 A`가 0.5초, `작업 B`가 2초 걸리는 작업이라면 **Sync**일 경우 2.5초, **Async**일 경우 0.5+a초 만큼의 응답속도를 보인다.

<br>

### 블로킹(Blocking) / 논블로킹(Non-Blocking)

   **Non-Blocking(이하 논블로킹)**이란 이전 작업이 완료될 때 까지 기다리지 않고, 다음작업이 바로 진행될 수 있도록 동작하는 패러다임이다.

   처리해야 할 작업의 과정을 <span class="em red">막는가? 막지 않는가?</span>

   직접 제어할 수 없는 대상을 처리하는 방법으로 구분한다.

   1. **Blocking**
   
      직접 제어할 수 없는 작업이 끝날 때까지 기다려야 하는 경우를 말한다.

      호출된 함수에서 `I/O`작업등을 요청했을 경우 `I/O`작업이 처리되 전까지 아무일도 하지 못한다.

   2. **Non-Blocking**
   
      직접 제어할 수 없는 작업이 완료되기 전에 제어권을 넘겨주는 경우를 말한다.

      호출된 함수에서 `I/O`작업등을 요청했을 경우 `I/O`작업의 처리여부와 관계없이 바로 다음 작업을 할 수 있다.

***

<br>

## 동작 방식

위 정의에 따라 4가지의 경우의 수를 확인할 수 있다.

<br>

### 동기 - 블로킹

**동기**이므로 `요청 A`의 실행시간과 종료시간이 보장되며 내부의 `I/O`작업 또한 종료까지 대기했다가 작업이 반환(**블로킹**)된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf5d7aef-0eae-4fca-a91d-7898293a46c2%2F_2020-10-12__3.46.17.png?table=block&id=20f6c2f2-1e16-4394-9a55-5a7e610eb4ef&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

<br>

### 동기 - 논블로킹

**동기**이므로 `요청 A`의 실행시간과 종료시간은 보장된다. 하지만 내부 `I/O`작업은 **논블로킹**으로 이루어지므로 `I/O`작업의 반환여부와 상관없이 Kernel의 작업 결과는 Application으로 반환되며 Application에서는 부가적인 작업이 이루어진다.
이와 동시에 `I/O`작업이 반환되며 Application의 모든 작업이 완료되면 `요청 A`는 종료되어 결과를 반환한다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0b40af62-9083-4b28-8ae9-f93000bb4240%2F_2020-10-12__3.53.15.png?table=block&id=b0ac7ffe-c273-4f66-99cc-8e0e9e2d4a33&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

<br>

### 비동기 - 논블로킹

**비동기**이므로 각각의 작업이 순차적인 실행순서를 보장하지 않는다. `요청 A`가 요청되고 `I/O`작업까지 호출되면 **논블로킹**되어 Kernel은 다른 작업을 받을 대기를 한다.
그 사이 `요청 B`가 요청되고 Kernel을 작업을 완료하고 결과를 반환한다.
`I/O`작업이 완료되면 `요청 A`역시 결과를 반환하여 모든 프로세스가 완료된다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa004af0f-32d6-47ce-b8b9-f5f70c61534e%2F_2020-10-12__4.00.32.png?table=block&id=b2d7cc2c-f8b6-4a8e-9664-d01d7e1e8671&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

<br>

### 비동기 - 블로킹

이 케이스는 비효율적이라 사용되는 모델이 많지 않다.

하지만 <span class="em red">Node.js + MySQL</span>을 사용할 경우 **비동기-논블로킹**일지라도 블로킹되는 경우가 발생한다.
`MySQL`드라이버가 **Blocking**방식으로 동작하기 때문이다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5f628d9c-16f9-4105-89d5-40c18920ccb2%2F1231.jpg?table=block&id=9f5bdf0b-d3b5-4bb9-8239-ffcf91f92517&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## Node.js의 논블로킹

>블로킹은 Node.js 프로세스에서 추가적인 JavaScript의 실행을 위해 JavaScript가 아닌 작업이 완료될 때까지 기다려야만 하는 상황입니다. 이는 이벤트 루프가 블로킹 작업을 하는 동안 JavaScript 실행을 계속할 수 없기 때문입니다.

위 설명처럼 Node.js 역시 Javascript코드가 실행되는 도중 I/O 또는 네트워크 통신을 하는 작업이 수행되면 OS에게 이를 맡기는 방식으로 작업을 수행한다.

Node.js 표준 라이브러리는 두 종류의 `I/O 메서드`를 제공하며 **블로킹**의 경우 `Sync`라는 suffix를 붙이고 **논블로킹**의 경우 `callback`함수를 받는다.

### 블로킹

```javascript
console.log('start')
const fs = require('fs')
const data = fs.readFileSync('./file.txt')
console.log(data)
console.log('end')
```

위 코드는 `readFileSync()`라는 블로킹함수를 이용한 예이다.

따라서 순차적으로 코드가 실행되며 **file.txt**를 모두 읽기전에는 (`data`가 출력되기 전에는) 콘솔이 출력되지 않는다.

```
// Result
start
blahblah
end
```

<br>

### 논블로킹

```javascript
console.log('start')
const fs = require('fs')
fs.readFile('./file.txt', (err, result) => {
  if (err) throw err;
  else console.log(result)
})
console.log('end');
```

위 코드는 `readFile()`라는 논블로킹함수를 이용하였다.

`I/O` 작업은 콜백을 통해 그 결과를 반환하며, 이 작업과는 관계없이 `console.log()`함수는 순차적으로 수행된다.

```
// Result
start
end
blahblah
```

<br>

### 블로킹과 논블로킹 코드를 섞을 때의 위험성

공식문서에 나온 내용이지만 중요한 부분이라 다시 정리해본다.

두 방식의 함수를 섞어서 사용할 경우 수행순서의 차이로 인해 반환시간에 큰 차이가 발생하며

심할 경우 에러를 야기할 수 있다.

```javascript
const fs = require('fs')
fs.readFile('/file.txt', (err, data) => {
  if (err) throw err
  console.log(data)
})
fs.unlinkSync('/file.txt')
```

위 함수를 살펴보면 `readFile()` 이후 `unlinkSync()`함수가 호출된다. 순차적으로 실행되지만

`I/O`의 결과반환을 보장하지 않는 `readFile()`이 완료되기 전에 `unlinkSync()`함수로 인해 대상 파일이 제거될 수 있다.

따라서, 위와같은 코드보다는 완전히 논블로킹으로 작성하여 작업 수행순서를 보장해야한다.

```javascript
const fs = require('fs');
fs.readFile('/file.txt', (err, data) => {
  if (err) throw err
  fs.unlink('/file.txt', (e) => {
    if (e) throw e
  })
})
```

## 심화

설명을 위해 몇가지 내용을 대충 정리했다. 대략적으로 훑고 넘어가면

1. Node.js의 I/O 작업

   위 쪽에서는 I/O, 네트워크 작업등을 모두 OS에게 넘긴다고 정리하였다.
   
   <span class="em red">기본적으로 Node.js는 libuv위에서 동작한다.</span> 
   
   node 인스턴스가 동작하면 **libuv**에서는 워커 쓰레드풀(default 4개)이 생성되며 블로킹 작업(**네트워크, DB R/W**)들이 요청되면 커널(Window: `IOCP`, Linux: `AIO`)에서 어떤 비동기 작업들이 지원되는지 이미 알고 있기 때문에 커널의 비동기함수를 호출한다.

   작업이 완료되면 OS는 **libuv**에 완료를 알리고 이를 **EventLoop**의 콜백에 등록한다.

   처음 생성된 `워커 쓰레드`는 커널에서 지원하지 않는 작업들(소켓 작업 등)을 수행한다.

   <span class="em red">단, File I/O, crypto모듈(`pbkdf2()`) 지원하지 않는데 이때는 libuv의 쓰레드가 사용된다.</span>

   > [libuv](https://libuv.org/)

***

<br>

## Reference

<span class="reference">

[Node.js: Document](https://nodejs.org/ko/docs/guides/blocking-vs-non-blocking/)

[동기 vs 비동기, 블로킹 vs 논블로킹 쉽게 이해하기](https://siyoon210.tistory.com/147)

[nodejs의 내부 동작 원리 (libuv, 이벤트루프, 워커쓰레드, 비동기)](https://sjh836.tistory.com/149)

</span>
