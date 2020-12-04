---
category: "프로그래밍"
sub_category: "Typescript"
series_name: ""
series_num: 0
title: "Closure와 Private"
url: "closure-and-private"
description: "Javascript의 Clousure와 Typescript의 Private변수를 알아봅니다."
tags: ["Typescript", "Javascript", "Closure", "Private"]
date: 2020-10-24
update_date: 2020-10-24
---

Closure는 JS의 특징을 말할 때 필수적으로 나오는 요소이다.

이와 Typescript의 연관성 및 특징을 알아보려고 한다.

***

## 클로저 (Closure)

Goggle에 검색만 해도 잔뜩나와서 (*Chain Smokers를 포함해서...*)

구구절절 설명하기도 민만하지만 간단하게 정리해보려 한다.

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.
> -MDN-

쉽게 말하면 함수안에서 함수를 정의하고 사용하면 `클로저`라고 이해하고 사용했다.

```javascript
function outter(name) {
    const welcome = `Hello ${name}`
    function inner() {
       console.log(welcome)
    }
    inner()
}

outter('akasai') // Hello akasai
```

위 코드처럼 `otter()`함수의 스코프내에서 `inner()`함수가 선언되고 호출하며 마무리된다.

**클로저**라고 하면 가장 많이 보는 유형의 예제코드이다.

### 은닉화

클로저의 활용법중 가장 알려진 것은 `은닉화`일 것이다.

스코프 안의 내용을 은닉하기 위한 수단으로 많이 사용한다.

쉽게 말하면 `private 변수`를 만든다고 생각하면 될 것 같다.

이 것을 기존 javascript의 `prototype`을 이용해서 구현해본다면 아래와 같다.

```javascript
function Count() {
    this._count = 0
}

Count.prototype.counting = function() {
    console.log(++this._count)
}

const counter = new Count();

counter.counting() // 1
counter.counting() // 2
```

`this`키워드를 통해 **prototype**으로 묶고 이를 가산하는 방법이다.

변수명 앞에 `underscore(_)`를 사용한 `_count`는 일반적인 JavaScript 네이밍 컨벤션관점에서는 Private변수로 사용한다고 할 수 있다.

**어디까지나 컨벤션(약속)일뿐 실제로는 외부에서 너무 쉽게 접근/수정이 가능한 변수다.**

```javascript
function Count() {
    this._count = 0
}

Count.prototype.counting = function() {
    console.log(++this._count)
}

const counter = new Count();

counter.counting() // 1
counter.counting() // 2

counter._count = 99

counter.counting() // 100
```

<br>

`클로저`를 이용하면 좀 더 안정된 은닉화를 보여준다.

```javascript
function Count() {
    let _count = 0
    return function() {
        console.log(++_count)
    }
}

const counting = Count()
counting() // 1
counting() // 2
```

위 코드처럼 `_count`변수를 접근할 수 있는 다른 통로를 제공하지 않는 이상 이를 접근/수정할 수 있는 방법은 없다.

### 요약

간단하게 `Closure`에 대해 정리했다.

정말 대략적인 내용이고 깊이 들어간다면 **scope, 메모리 관리(GC)**등등 살펴볼 내용이 많지만

참조문서에 정말 잘 설명되어있는 포스팅이 있으므로 생략한다.

***

## Typescript

Java와 같은 시스템언어를 사용해왔던 분들에게 익숙한 `private` 예약어가 Typescript에 존재한다.

이를 활용하면 Javascript처럼 굳이 클로저를 구현하지 않아도 `은닉화`를 할 수 있다.

### Private

private 변수를 이용하여 위 내용을 구현해보면

```typescript
class Counter {
    private count: number
    constructor() {
        this.count = 0
    }

    counting(): void {
        console.log(++this.count)
    }
}

const counter = new Counter()
counter.counting() // 1
counter.counting() // 2
```

물론... `Class`를 이용했지만... 위와 같이 간단하게 구현할 수 있다.

만약 강제로 변수에 접근하려 하면 아래와 같은 에러를 뱉는다.

```typescript
counter.count = 99
// TS2341: Property 'count' is private and only accessible within class 'Counter'
```

너무 편하지 않은가!? (*모두 TS쓰세요!!!*)

<span class="em red">하지만 의문점이 생긴다.</span>

### TSC

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9343aee2-7402-4856-b3bf-0bfd9702b926%2Fpx52c3vht.jpg?table=block&id=f7bf0703-d3e3-4d22-9759-06ca5ef5b8b6&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

Typescript는 Javascript의 상위확장(Superset)이다. 결국 이 코드가 동작하는 실제 파일은 `.js`파일이다.

과연 `tsc`로 컴파일된 js파일은 어떤 형태일까?

```javascript
var Counter = /** @class */ (function () {
    function Counter() {
        this.count = 0;
    }
    Counter.prototype.counting = function () {
        console.log(++this.count);
    };
    return Counter;
}());
var counter = new Counter();
counter.counting(); // 1
counter.counting(); // 2
```

실제 컴파일되어 나온 js파일(목적파일이라고 해야할지...)은 위처럼 매우 익숙한 형태로 구성된다.

클래스를 생성하는 `생성자(constructor)`는 동일한 이름의 `Closure`로 선언되어 `IIFE`형태로 정의되었다.

클래스 내부 메소드는 `prototype`으로 체이닝되어 있었다.

물론 더 복잡한 Class를 구성하면 js파일도 더 복잡해지겠지만 위 결과는 꽤 신선하게 다가왔다.

<br>

그렇다면.... 위에서 테스트해본 것 처럼 내부변수의 접근/수정이 가능할까?

이론상으론 `this`에 묶여있는 **count**변수는 충분히 접근/수정이 가능할 것 같은데?

```javascript
var counter = new Counter();
counter.counting(); // 1
counter.counting(); // 2

counter.count = 99
counter.counting(); // 100
```

두둥...

prototype으로 묶어봤던 상단의 테스트처럼 내부변수의 접근/수정이 가능한 결과를 보았다.

***

## 결론

실무에서 Typescript를 이용하면서 동료개발자와 호기심에 시도해보았던 내용을 바탕으로 해본 테스트였다.

> Typescript에서 private변수는 진짜 은닉이 될까???

<span class="em red">결론은 맞으면서 아니였다.</span>

IDE나 TsLint등을 이용하면 엄격한 TS의 룰을 충분히 활용할 수 있고

애초에 컴파일 단계에서 컴파일에러를 보여줄 것이다.

**충분히 안전하게 사용할 수 있다는 뜻이다.**

하지만 위와 같은 내용을 알고있는 것이 Typescript를 더 적절히 사용할 수 있을 것이라 생각한다.

덕분에 클로저에 대한 내용도 다시 한번 정리해볼 수 있었던 것 같다.

***

## Reference

<span class="reference">

[JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)

</span>
