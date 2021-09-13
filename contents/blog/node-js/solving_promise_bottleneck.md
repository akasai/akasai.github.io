---
category: "Node.js"
title: "async/await 병목현상 줄여보기"
series_name: ""
series_num: 0
tags: ["Node.js", "Javascript", "Promise", "Async", "Await", "ES6"]
date: 2020-09-21
---

블로그 글을 보다 나는 지금 어떻게 개발하고 있는지 궁금해서 직접 테스트해보았다.

async/await를 습관적으로 쓰고 있지만, 잘 쓰고 있는지 되돌아보는 계기가 되었다.

***

## Async/Await의 병목현상

Promise의 등장으로 `callback` 함수 불편한 부분이 많이 개선되었다.

**async/await**의 등장은 `.then()` 체인으로 인한 가독성까지도 보완하였다.

하지만, 정리되지 않은 사용은 함수 수행시간에 상당한 영향을 줄 수 있다.

### 함수 정의

```javascript
const Promise1 = () => new Promise((resolve) => setTimeout(resolve, 1000))

const Promise2 = () => new Promise((resolve) => setTimeout(resolve, 1100))

const Promise3 = () => new Promise((resolve) => setTimeout(resolve, 1200, 900))

const Promise4 = (time) => new Promise((resolve) => setTimeout(resolve, time))
``` 

테스트를 위해 각각 **1000, 1100, 1200** 그리고 **param** 값 만큼 딜레이되는 Promise함수를 만들었다.

### 현상 확인

```javascript
const main = async () => {

    const test1 = await Promise1() // 1000
    const test2 = await Promise2() // 1100
    const test3 = await Promise3() // 1200
    const test4 = await Promise4(test3) // 900

}

main();
```

위 함수들을 **async/await** 를 이용하여 실행시키면 동기적으로 동작하기 때문에 총 **4200ms** 의 수행속도를 보여준다.

<span class="callout">Nodejs의 이벤트 처리 특성상 정확히 **4200ms**가 나오지 않을 수 있다.</span>

### Promise.all

```javascript
const main = async () => {

    const [test1, test2, test3] = await Promise.all([
        Promise1(),
        Promise2(), 
        Promise3(), 
    ]) 
    const test4 = await Promise4(test3) 

}

main();
```

Promise 함수들을 동시처리할 때 가장많이 사용하는 함수인 `Promise.all` 을 이용하여 **4200ms** 에서 **2100ms**까지 성능개선을 하였다.

거의 절반에 가까운 개선이다.

각 함수들간 의존성이 없을 땐 `Promise.all`을 이용하면 상당한 효과를 볼 수 있다.

### 의존성을 갖는 함수

```javascript
const main = async () => {

    const [test1, test2, test3] = await Promise.all([
        Promise1(), 
        Promise2(), 
        Promise4(await Promise3())
    ]) 

}

main()
```

위와 같이 의존성을 갖는 함수의 수행위치를 변경하면 속도 개선을 기대할 수 있다.

하지만 위 코드의 수행속도는 **2100ms** 으로 앞서 수행했던 코드와 동일하다.

왜 일까??

### 최적화된 코드

`Promise.all` 을 이용한 개선 결과를 보면 수행시간이 같은 것을 볼 수 있다.

이는 처음 구성했던 함수들의 수행시간과 연관이 있다. 개선이 기대되는 함수 `Promise3`의 수행시간이 **1200ms**로 가장 늦게 종료되는 함수였기 때문에 Worst-case의 수행시간이 측정되었다.

첫 함수의 조건을 좀 변경해보면 눈에 띄는 결과를 볼 수 있다.

```javascript
const Promise1 = () => new Promise((resolve) => setTimeout(resolve, 3000, 1))

const Promise2 = () => new Promise((resolve) => setTimeout(resolve, 1100, 2))

const Promise3 = () => new Promise((resolve) => setTimeout(resolve, 100, 900))

const Promise4 = (time) => new Promise((resolve) => setTimeout(resolve, time || 0))
```

각 함수들의 수행시간을 **3000, 1100, 100** 로 변경하였다.

위 내용을 바탕으로 동기적으로 함수들을 수행해보면 **5100ms**의 수행시간을 기대할 수 있다.

함수들을 각각 개선해보면 **3900ms**까지 줄일 수 있었고, 다시 한번 위쪽의 개선코드를 적용해보았다.

```javascript
const main = async () => {

    const [test1, test2, test3] = await Promise.all([
        Promise1(),
        Promise2(),
        Promise4(await Promise3())
    ]) 

}

main()
```

이렇게 적용했을 때, **3000ms** 의 결과를 얻었다. 무료 2100ms의 절감효과를 보았다.

***

## 결론

async/await는 동기적 프로그래밍에 있어 상당히 도움이 되고, 가독성 역시 꽤 높여주고 있다.

적절한 사용은 큰 문제가 없지만, 다수의 await을 사용은 성능에 큰 영향을 줄 수 있다.

구현할 때, 함수간 <span class="em red">의존성</span>을 정확히 판단하여 `Promise.all`등의 함수를 적절히 사용한다면 
미미할지라도 성능향상을 기대할 수 있을 것 같다.

***

## Reference

* [await의 함정, 숨은 병목을 찾자](https://jaeheon.kr/161?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social&fbclid=IwAR3zIs9MMfUi_y-CaiCd9dgJaumpMBzOjdUJFXNg2pWFGioUeDv7pFVsoD8)
