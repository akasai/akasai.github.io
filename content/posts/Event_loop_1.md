---
category: "개발/Node.js"
series: 1
title: "Node.js 동작 원리"
url: "nodejs-1"
description: "Node.js V8엔진의 기본적인 내용을 정리합니다."
tags: ["Node.js", "Javascript", "V8", "EventLoop"]
date: 2020-10-06
update_date: 2020-10-06
---

Node.js를 이용하고 개발을 하면서 너무나 자연스럽게 **callback** 을 다루면서 **callback헬** 을 겪었다.

본격적으로 **Promise**를 이용한 비동기 처리를 배우고 **async/await** 를 사용하여 편리하게 비동기 처리를 하고 있지만,

정작 내부적으로 어떤 방식으로 동작하는지 정확히 알지 못하고 사용했다.

***

<br>

## Javascript 엔진 구조

<span class="call">
비동기 이벤트 주도 Javascript 런타임으로써 Node.js는 확장성있는 네트워크 애플리케이션을 만들 수 있도록 설계되었습니다.
</span>

Node.js는 이벤트 기반 자바스크립트 런타임으로 구글에서 개발한 `V8 엔진` 의 특징을 동일하게 갖는다.

**이벤트 루프**를 기반의 비동기 방식으로 `Non-Blocking IO`를 통해 싱글 스레드로 동작하지만 동시성을 지원한다.

Javascript 엔진은 크게 두 가지 영역으로 나뉜다.

<br>

### Call Stack

코드의 실행에 따라 호출 스택이 쌓여 처리되는 곳이다. 

**단 한개의** 콜 스택을 가지고 있으며 이것은 <span class="em red">동시에 단 하나의 작업만을 할 수 있다는 의미이다.</span>

함수가 실행되면 콜스택에 순차적으로 Push되고 함수가 종료되면 Pop되는 **FILO(First In Last Out)**형태로 동작한다.

이런 특징을 지닌 Javascript엔진은 `Event Loop`와 `Queue`를 이용하여 비동기처리가 가능하게 된다.

<br>

### Heap

대부분 구조화되지 않는 `더미(dummy)`같은 메모리 영역을 **힙(heap)**이라고 한다.

동적으로 생성된 변수, 객체(인스턴스)는 **힙(heap)**에 할당된다. 

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2927c772-b3ff-4fa0-bd0f-5905ee861e44%2Fjs-engine-structure.png?table=block&id=79a25445-ffc4-4519-a42b-cde943c1761e&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## 런타임

`V8 엔진`과 같은 자바스크립트 엔진에는 한 개의 콜 스택을 이용하여 순차적으로 처리할 뿐, 흔히 알고 있는 **이벤트 루프, 큐** 가 없다. 

뿐만 아니라 주로 사용되는 **DOM, Ajax, setTimeout** 등과 같은 내장 API들 역시 자바스크립트 엔진에서 제공하지는 않는다.

이 것들은 자바스크립트 엔진을 구동하는 **런타임 환경(브라우저나 Node.js)**이 제공해준다.

<span class="callout">
런타임<br>
&nbsp;&nbsp;&nbsp;프로그램이 실행되고 있는 때 존재하는 곳을 의미한다. 프로그래밍 언어가 구동되는 환경을 말하며,<br>
&nbsp;&nbsp;&nbsp;Javascript는 브라우저, Node.js환경이 런타임이 될 수 있다. </span>

런타임 환경에서는 크게 세가지를 제공한다.

<br>

### Web API

런타임 환경에서 제공하는 API들이다.

Javascript코드를 사용하여 접근할 수 있으며 window나 element에 대한 간단한 작업에서부터 WebGL이나 Web Audio와 같은 API를 사용해 복잡한 그래픽 및 오디오 효과를 만들어내는 것까지 가능하다.

1. DOM (document)

2. Ajax (XMLHttpRequest)

3. Timeout (setTimeout)

<br>

### Event Loop

반복하여 **콜 스택** 과 **큐(Queue)** 사이의 작업들을 확인하며, 콕 스택이 빈 상태가 되면 큐의 작업을 콜 스택에 넣는다.

위와 같은 반족적인 작업을 `Tick`이라고 한다.

일련의 작업들은 **Event loop**를 통해 **콜 스택**에서 처리된다.

Node.js에서는 이벤트 루프를 이용하여 동시성을 지원한다.

<br>

### Queue

Task들이 임시로 저장되어 실행을 대기하는 **큐(Queue)**이다.

콜스택이 빈 상태가 되면 **FIFO(First In First Out)**형태로 큐에서 스택으로 이동하고 작업이 수행된다.

ES6 도입 이후로 `Microtask Queue`가 도입되어 대표적으로 3가지 종류의 큐가 존재한다.

1. Task Queue (Callback Queue)

   `Promise`가 공개되기 이전 비동기로 호출되는 대부분의 작업들을 임시 저장하는 큐
   
2. Microtask Queue

   Task Queue와 동일한 계층에 존재하며, `Promise` 비동기 호출작업들이 임시저장되는 큐
   
3. Animation Frames

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F80564363-c1a2-49a1-88b0-8b2ab5582d50%2Fqueu.png?table=block&id=475af1fa-6e5f-4499-9468-9ac53f5e718b&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## Reference

<span class="reference">

[[JS] Javascript의 Event Loop](https://asfirstalways.tistory.com/362)

[[Javascript] 자바스크립트의 호출 스택과 이벤트 루프](https://iamsjy17.github.io/javascript/2019/07/20/how-to-works-js.html)

[javascript 동작 원리](https://velog.io/@namezin/javascript-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC)

</span>
