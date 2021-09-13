---
category: "Typescript"
title: "Enum"
series_name: ""
series_num: 0
tags: ["Typescript", "Enum"]
date: 2020-10-28
---

`Enum Type`은 Javascript와 Typescript와의 여러가지 차이점 중 한가지이다.

다양한 시스템 언어들이 **Enum**을 사용하고 있기 때문에 굳이 자세히 설명하지 않아도 될 것 같다.

***

## Enum

**Enum** 타입을 사용하는 이유는 다양하다.

1. 가독성을 높힌다.

   공통된 특징을 지닌 변수를 한 곳에 묶어서 사용할 수 있기 때문에 가독성이 높아진다.

2. 엄격한 타입정의가 가능하다.

   Typescript를 사용하는 이유중 한가지인 엄격한 형관리를 좀 더 타이트하게 할 수 있다.

3. 자칫 발생할 수 있는 값 변경을 방지할 수 있다.

   2번에서 이어지는 형관리를 통해 자칫 발생할 수 있는 값 변경을 방지할 수 있다. (*Enum에 정의되지 않는 데이터*)

### Enum의 사용

간단하게 *Typescript*에서 `Enum`을 사용해 보자면

```typescript
enum COUNT1 {
    ZERO,
    FIRST,
    SECOND
}

console.log(COUNT1.ZERO) // 0


enum COUNT2 {
    FIRST = 1,
    SECOND,
    THIRD
}

console.log(COUNT2.SECOND) // 2

enum COUNT3 {
    FIRST = 1,
    SECOND = 4,
    THIRD
}

console.log(COUNT3.THIRD) // 5
```

사용법부터 특징까지 기존언어들과 매우 동일하다.

별다른 값을 명시하지 않는다면 첫 데이터 순서대로 `0, 1, 2...` 값을 갖는다.

초기 값을 숫자로 정의하면 나머지 데이터는 `+1` 만큼 연산된 숫자를 차례로 갖는다.

<br>

만약 숫자가 아닐 경우엔 정확히 데이터를 할당해 주어야한다.

```typescript
enum ALPHABET {
    A = 'a',
    B, // TS1061: Enum member must have initializer.
    C // TS1061: Enum member must have initializer.
}
```

### Enum == Object??

Typescript에서 Enum의 가장 큰 특이점은 바로 Object라는 점이다.

```typescript
enum STATUS {
    SUCCESS = 's',
    FAIL = 'f',
    PENDING = 'p',
    PROGRESS = 'g'
}

console.log(STATUS) // { SUCCESS: 's', FAIL: 'f', PENDING: 'p', PROGRESS: 'g' }
```

이것이 가능한 이유는 tsc를 이용해 컴파일해보면 쉽게 알 수 있다.

```javascript
var STATUS;
(function (STATUS) {
    STATUS["SUCCESS"] = "s";
    STATUS["FAIL"] = "f";
    STATUS["PENDING"] = "p";
    STATUS["PROGRESS"] = "g";
})(STATUS || (STATUS = {}));
```

위와 같이 **Object**에 각 **key**값을 할당해주는 방식으로 컴파일된다.

결국 Object라고 볼 수 있다.

이를 알고 활용하면 `Object내장함수`를 이용하여 여러가지 응용이 가능하다.

```typescript
enum STATUS {
    SUCCESS = 's',
    FAIL = 'f',
    PENDING = 'p',
    PROGRESS = 'g'
}
console.log(Object.keys(STATUS)) // [ 'SUCCESS', 'FAIL', 'PENDING', 'PROGRESS' ]
console.log(Object.values(STATUS)) // [ 's', 'f', 'p', 'g' ]
```
