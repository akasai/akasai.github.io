---
category: "Node.js"
title: "Promise.allSettled()"
series_name: ""
series_num: 0
description: "Promise.allSettled의 특징과 사용법을 알아보았습니다."
tags: ["Typescript", "Javascript", "Promise", "Node.js", "es2020"]
date: 2021-12-08
---
**Promise.allSettled**함수는 iterator의 모든 Promise함수들의 결과가 처리(`fulfilled` 또는 `rejected`)될 때까지 대기한 뒤 결과를 반환하는 함수입니다.

이와 관련된 내용을 알아보려 합니다.

---

**Promise.all**은 여러개의 `PromiseLike`함수들을 병렬로 실행하여 효율성을 높여주는 함수로 많이 사용되고 있습니다. 

iterator형태의 매개변수를 받고 배열형태의 결과값을 반환합니다.

병렬로 처리할 수 있다는 편의성과 반대로 iterator안의 함수가 <span class="em red">한 개라도 reject된다면 Promise.all 전체에서 exception이 발생</span>하는 특징이 있습니다. 

이것이 Promise.allSettled와 Promise.all의 **가장 큰 차이점**입니다.

단점이라고 할 수는 없지만, 특정 상황에서는 불편함을 겪을 수 있는 특징입니다.

## 특징

1. `PromiseLike` 타입의 **배열형태의 결과**를 반환합니다.
2. 각 **결과 Object**는 두가지 프로퍼티(**status** & **reason/value**)를 가질 수 있습니다.
3. **status**는 `fulfilled`과 `rejected`를 값으로 가집니다.
4. **value**는 status가 `fulfilled`일 때, **reason**은 `rejected`일 때 갖는 값입니다.

```typescript

allSettled<T>(values: Iterable<T>): Promise<PromiseSettledResult<T extends PromiseLike<infer U> ? U : T>[]>;
```

1번 특징처럼 **allSettled**함수는 위와 같은 형태의 Response type을 갖습니다.

`PromiseSettledResult` type은 아래와 같이 정의되므로 2,3,4번과 같은 특징을 같습니다.

```typescript

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}
```

## 사용법

이는 `Node.js 12.9` 이상, `es2020 lib`, `TS 3.9` 이상에서 정의되어 있고, 특정 브라우저(IE)는 사용하지 못합니다.

**[TC39 스펙](https://tc39.es/proposal-promise-allSettled/#sec-performpromiseallsettled)은** 아래와 같이 사용법을 정의합니다.

1. Accepts `iterable` object as an argument.
2. If `not iterable`, `throw` an `exception` with an error message.
3. Iterate the argument if it is `iterable`.
4. Keep the `results` in an array.
5. Wait for all promises to either get `resolved`/`rejected`.
6. Return the `results`.

## 구현

```typescript

/**
 * user 목록을 조회하는 함수
 */
async function apiCall(p: number = 1) {
  console.log('### Get API start', p)
  if (p === 0) throw new Error('invalid argument')
  return fetch(`https://reqres.in/api/users?page=${p}`)
}
```

API호출을 통해 정보를 조회하는 간단한 로직을 구현하였습니다. 만약 argument가 **0이라면 error를 발생**하게 유도하였습니다.

### Promise.all

```typescript

async function main() {
  const task = [apiCall(0), apiCall(1)]
  try {
    const result = await Promise.all(task)
    console.log('result', result)
  } catch(e) {
    console.log('error', e)
  }
}

// ### Get API start, 0
// ### Get API start, 1
// error [Error: invalid argument]
```

**Promise.all**을 이용한 로직을 구현해보면 위와 같은 결과를 볼 수 있습니다.

실제로 task(iterator)가 동작하였지만, exception발생으로 인해 result가 아닌 <span class="em red">error</span>를 확인할 수 있었습니다.

_**결론적으로 우리가 원하는 response를 확인할 수 없었습니다.**_

### Promise.allSettled

```typescript

async function main() {
  const task = [apiCall(0), apiCall(1)]
  try {
    const result = await Promise.allSettled(task)
    console.log('result', result)
  } catch(e) {
    console.log('error', e)
  }
}

// ### Get API start, 0
// ### Get API start, 1
// result [ 
//    { status: 'rejected', reason: [Error: invalid argument] }, 
//    { status: 'fulfilled', value: Response {...} }
// ]
```

**Promise.all**과 다르게 reject가 발생했음에도 **정상적으로 결과**를 받아 볼 수 있었습니다.

이 결과처럼 task(iterator)의 성공여부과 상관없이 결과를 보장한다는 점에서 이점이 있는 것 같습니다.

## 이슈

비교적 최근에 추가된 함수이므로 Reference가 다양하지 않습니다.

`TS4.5` 미만의 환경에서는 정상적으로 Type 정의가 되지 않습니다.

위 예제를 예로들어 설명하자면, Response Type이 `PromiseLike`형태로 정의되어 있습니다.

```typescript

allSettled<T>(values: Iterable<T>): Promise<PromiseSettledResult<T extends PromiseLike<infer U> ? U : T>[]>;

interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}
```

때문에 `fulfilled`된 결과가 반환되면 이미 **await**된 Response가 아닌 **Promise<{Pending}>** 형태로 
정의되는 현상을 볼 수 있습니다.

물론 Type 정의의 문제이기 때문에 **IDE상의 컴파일 에러**일 뿐이지만, 개발 효율성이 저하되는 문제를 야기합니다.

```typescript

async function main() {
  const task = [apiCall(0), apiCall(1)]
  try {
    const result = await Promise.allSettled(task)
    console.log('result', result[1].value.someThing)
      // Error TS2339: Property 'someThing' does not exist on type 'Promise<Response>'
  } catch(e) {
    console.log('error', e)
  }
}

// ### Get API start, 0
// ### Get API start, 1
// result [ 
//    { status: 'rejected', reason: [Error: invalid argument] }, 
//    { status: 'fulfilled', value: Response {...} }
// ]
```

이 문제는 `TS4.5`버전이 Release되어 `Awaited` Type이 추가된 후 해결되었습니다.

```typescript

allSettled<T>(values: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<Awaited<T>>[]>;
```
***

## Reference

* [tc39.es](https://tc39.es/ecma262/#sec-promise.allsettled)

* [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

* [microsoft/TypeScript](https://github.com/microsoft/TypeScript/blob/main/src/lib/es2020.promise.d.ts)
