---
category: "프로그래밍"
sub_category: "기초이론"
series_name: ""
series_num: 0
title: "동시성과 병렬성"
url: "cuncurrency-parallelism"
description: "동시성과 병렬성의 특징을 알아봅니다."
tags: ["동시성", "병렬성", "Concurrency", "Parallelism"]
date: 2021-01-18
update_date: 2021-01-18
---

싱글 스레드기반의 프로그램들에 대한 공부를 하던 
먼저 알고 넘어가야할 중요한 개념이라 생각되어 정리를 해보았다.

***

## 동시성 (Concurrency)

1. **동시에 실행되는 것**처럼 보이는 것.

2. Time-sharing 알고리즘(시분할 등)을 이용하여 작업을 수행한다.

3. `싱글코어` 환경에서 `여러 스레드`를 처리하는 것이다.

4. 작업간 `Context Switching(문맥교환)`을 통해 자원을 공유한다.

5. **한 번에 많은 것을 처리하는 것.**

***

## 병렬성 (Parallelism)

1. 실제로 **동시에 실행되는 것**

2. `멀티코어 환경`에서 `여러 스레드`를 처리하는 것이다.

3. **한 번에 많은 일을 처리하는 것.**
***

## Summary

동시성있는(Concurrent) I/O를 지원한다는 것은
한 개의 컴퓨팅 유닛을 사용하여 Client들에게 동일한 플로우를 통한
작업을 처리한다는 것이다.

반면에 병렬성을 지원한다는 것은 다중 컴퓨팅 유닛을 이용하여 
**동시에** 여러가지를 처리한다는 것이다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbaf768df-ef13-45c5-816c-241f7bc1c2b9%2F_2021-01-18__9.20.00.png?table=block&id=7e890a5a-322d-4743-bf1c-8d3ef1b4d43d&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F489a75b5-2ed8-4285-87be-c2955e187fb8%2F_2021-01-18__9.20.12.png?table=block&id=27663723-67e3-4759-b420-5a87c7be675e&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)
