---
category: "프로그래밍"
sub_category: "Node.js"
series_name: "Node.js 파헤치기"
series_num: 4
title: "Node.js의 스레드"
url: "nodejs-4"
description: "Node.js 싱글스레드에 대하여 알아봅니다."
tags: ["Node.js", "Javascript", "V8", "Single Thread", "싱글스레드"]
date: 2020-10-13
update_date: 2020-10-13
---

앞서서 Node.js의 비동기처리에 대한 전반적인 내용을 정리했다.

이번엔 싱글만레드의 특징을 정리하려 한다.

*&#43; 정말... 해도해도 공부할 내용이 끝이 없다. 얼마나 대충쓰고 있었는지 반성한다....*

***

## 싱글 스레드 (Single Thread)

**싱글 스레드(Single Thread)**란 말 그대로 하나의 스레드만을 사용하여 여러 작업요청을 처리하는 방법이다.

앞서 정리한 것처럼 `I/O`작업과 같은 경우 비동기방식으로 처리하고

그 동안 다른 작업을 처리하는 방식이다.

<span class="em red">한개의 콜스택으로 명령을 처리하는 Node.js</span>는 이런면에서 `싱글 스레드`라고 할 수 있다.

그렇다면 Node.js는 항상 **싱글 스레드**방식으로 동작할까??

정답은 <span class="em red">아니다.</span>

*** 

## 스레드 풀 (Thread pool)

**멀티 스레드(Multi Thread)**모델의 경우 `스레드 풀`을 두고 요청을 처리할 때 스레드를 기반으로 처리한다.

앞서 정리한 것 처럼 대부분의 작업은 콜스택을 통해 처리되며 Queue를 이용해 비동기 작업을 처리하지만

**I/O, 네트워크**등의 작업은 OS에게 작업은 넘겨주는 `논블로킹`방식으로 동작한다.

하지만, OS에서 지원하지 않는 비동기작업이나 특정 I/O작업은 **libuv**에서 처리하게되며 이는 내부적으로 운영되는

`스레드 풀`을 이용하여 논블로킹을 유지한다.

이러한 이유로 **단일 콜스택**측면에서는 `싱글 스레드`이지만 넓은 측면에서 본다면 무조건 싱글스레드는 아니라고 볼 수 있다.


![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fce9951af-bea8-44a4-ab88-ed5a8be133cb%2Fnodejs.jpg?table=block&id=9012861c-5909-479b-b25f-933ad303110d&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

## 스택 오버플로우 (Stack Overflow)

Javascript는 작업 수행도중 에러가 발생하면 `Stack trace`라는 내용을 확인할 수 있다.

모든 작업이 하나의 콜스택에서 이루어지기 때문에 알 수 있는 특징이다.

**스택**이라는 용어에서 추측할 수 있듯이 에러나가 발생하기전 처리되었던 내용들이 `Stack trace`를 통해 확인할 수 있다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F30d30f34-a4ee-4c92-8be6-f786cc2383b7%2Fstack-trace-example.png?table=block&id=1add1722-1625-4ee1-9dbe-16169fa8adcf&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

<span class="em red">여기서 주의할 점은 콜스택도 경국 유한한 구조라는 점이다.</span>

명령들이 반환되지 않을 상태로 콜스택에 계속 쌓이게 되면 결국 넘치게 되고 

`Maximum call stack size exceeded` 에러를 뿌린다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff2903775-e5e4-4e62-8e61-70bd9442a21c%2F1_5n-8aGqENgdDy3T_qPqCgA.png?table=block&id=a3e2e01c-9707-414c-be84-f768635a76a6&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

## 이벤트 루프 멀티플랙싱(Multiplexing)

Node.js는 `싱글 스레드`라는 내용은 자주 언급된다.

많은 수의 작업이 요청되는 경우 (*예를 들면 API호출*) 이를 어떻게 처리할 것인지 의문이 발생한다.

바로 이벤트 루프의 `멀티 플렉싱(Multiplexing)`에서 그 답을 찾을 수 있다.

### 멀티플렉싱(Multiplexing)

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc5ade81c-3bbf-4fb0-b917-eba48bb78bc5%2Fasynchronous-programming.jpg?table=block&id=56865363-0e69-49b6-a7bf-17389948d264&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

`멀티플렉싱(Multiplexing)`이란 하나의 통신채널을 통해 다량의 데이터를 전송하는데 사용되는 기술이다.

즉, 매 요청마다 새로운 프로세스나 스레드를 생성하는 것이 아니라 <span class="em red">요청의 갯수와 상관없이 한개의 프로세스나 스레드를 이용</span>하여 작업을 처리하는 방법이다.

주파수 분할, 시분할 등을 예로 들 수 있다.

### Node.js의 경우

Node.js의 모든 작업처리는 **단일 콜스택**에서 이루어지고 비동기 처리는 **Queue**를 이용하며 둘은 하나의 쓰레드로 이루어진 **이벤트 루프**를 통해 동작한다.

**이벤트 루프**는 `멀티플렉싱(Multiplexing)`방식으로 동작한다. 여러 개의 소켓이 동시에 연결되어 있고, 이들을 관찰하면서
들어오는 작업을 처리하는 방식이다.

기존의 웹서버의 경우엔 요청이 들어오면 이를 처리하기위한 프로세스나 쓰레드를 생성하는데 이를 대기하는 시간이 발생하고 (Thread waiting)이 과정에서 병목현상이 발생한다.

하지만 Node.js의 경우에는 다량의 작업이 요청되어도 쓰레드대기가 발생하지 않고 작업의 처리는 다른 쓰레드로 넘겨버리기 때문에 바로 다른 작업 요청을 받을 수 있다.

<span class="callout">위 방식이 만능은 아니다. CPU의 영향을 많이 받는 요청의 경우 한정된 쓰레드에서 I/O 작업이 처리되며 이를 이벤트루프는 대기하기 때문에 이후 발생하는 다른 Request들에 병목현상이 발생한다.</span>

***

## Reference

<span class="reference">

[Node.js의 기초(내부 아키텍처, 이벤트루프와 워커, 비동기의 이해)](https://sjh836.tistory.com/79)

[빠르게 훝어보는 node.js](https://bcho.tistory.com/881)

[Node.js 란](https://ggoals.tistory.com/63)

</span>
