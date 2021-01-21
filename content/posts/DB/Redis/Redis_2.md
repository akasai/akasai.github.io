---
category: "DB"
sub_category: "Redis"
series_name: "Redis 파헤치기"
series_num: 2
title: "Redis가 싱글스레드인 이유?"
url: "why-redis-is-single-thread"
description: "Redis가 싱글스레드로 구성된 이유를 알아봅니다."
tags: ["Redis", "레디스", "싱글스레드", "NoSQL"]
date: 2021-01-21
update_date: 2021-01-21
---

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F92ea1c01-48c8-41e5-80e6-082ea9eed282%2F1200px-Redis_Logo.svg.png?table=block&id=0ac5fa14-b0a1-436d-979e-644cfcaeaaa2&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

레디스의 대표적인 특징은 **싱글스레드**입니다.

왜 싱글스레드로 구성되었는지 알아보았습니다.

***

## 레디스가 싱글스레드인 이유?

레디스는 **Event Loop(이벤트루프)**를 이용하여 요청을 수행합니다. 

즉, 실제 명령에 대한 작업(Task)는 커널 I/O 레벨에서 Multiplexing(멀티플렉싱)을 통해 처리하여 동시성을 보장합니다.

따라서, 유저 레벨에서는 싱글스레드로 동작하지만, 커널 I/O 레벨에서는 스레드풀을 이용합니다.

### 4가지 이유

1. CPU는 병목현상의 원인이 아님

   레디스의 병목현상의 대부분은 CPU가 아닌 시스템 **메모리/네트워크 대역폭**에서 발생합니다.

2. 동시성을 보장 (병렬성과는 다름)

   이벤트루프 패턴을 통해 **동시성**을 구현하였고 Context-Switch(문맥교환)가 없어 자원을 절약합니다.

3. 쉬운 구현 (프로그래밍 용이성)

4. 쉬운 배포

   최소 한 개의 Core(코어)만 있어도 사용할 수 있기 때문에 배포/사용이 쉽습니다.

### Sub 스레드

```shell
$ ps -eLf | grep "redis"
```

레디스가 동작하는 환경에서 프로세스를 조회해보면 이상하게도 3개의 스레드가 동작하고 있습니다.

그렇다면 레디스는 위에서 설명한 것과 달리 멀티스레드일까요?

위 스레드에 대한 답은 레디스 코드에서 찾아볼 수 있습니다.

> [bio.c](https://github.com/redis/redis/blob/unstable/src/bio.c)
> [bio.h](https://github.com/redis/redis/blob/unstable/src/bio.h)

```
/* Background job opcodes */
#define BIO_CLOSE_FILE    0 /* Deferred close(2) syscall. */
#define BIO_AOF_FSYNC     1 /* Deferred AOF fsync. */
#define BIO_NUM_OPS       2
```

위 파일은 레디스의 스레드를 처리하는 부분입니다.

코드에서 보여주는 것처럼 메인 스레드를 제외하고 2개의 스레드를 더 호출하고 있습니다.

1. 메인 스레드

   대부분의 명령/요청, 이벤트를 처리합니다.

2. Sub 스레드 1번(BIO_CLOSE_FILE)
   
   `AOF` Rewrite 할 때 새 파일에 Rewrite 완료하고 기존 파일을 close 할 때 동작합니다. 
   
   `AOF`를 활성화하지 않아도 쓰레드는 생성됩니다.
   
3. Sub 스레드 2번(BIO_AOF_FSYNC)
   
   1초 마다 `AOF`에 쓸 때 동작합니다.

물론 여기까진 v4.0이전의 이야기입니다.

***

## v4.0 이후

> with Redis 4.0 we started to make Redis more threaded. For now this is limited to deleting objects in the background, and to blocking commands implemented via Redis modules. For the next releases, the plan is to make Redis more and more threaded.

v3.2까지의 레디스는 위쪽의 설명처럼 3개의 스레드를 이용하여 동작했습니다.

v4.0이 릴리즈된 이후 **새로운 스레드**가 추가되었습니다.

> [bio.c](https://github.com/redis/redis/blob/unstable/src/bio.c)
> [bio.h](https://github.com/redis/redis/blob/unstable/src/bio.h)

```
/* Background job opcodes */
#define BIO_CLOSE_FILE    0 /* Deferred close(2) syscall. */
#define BIO_AOF_FSYNC     1 /* Deferred AOF fsync. */
#define BIO_LAZY_FREE     2 /* Deferred objects freeing. */
#define BIO_NUM_OPS       3
```

4. Sub 쓰레드 3번(BIO_LAZY_FREE)
   
   UNLINK, 비동기 FLUSHALL 또는 FLUSHDB 명령을 처리할 때 동작합니다.

<br>

> Redis DEL operations are normally blocking, so if you send Redis “DEL mykey” and your key happens to have 50 million objects, the server will block for seconds without serving anything in the meantime.
>
> **Non blocking DEL and FLUSHALL/FLUSHDB**
>
> There is a new command called UNLINK that just deletes a key reference in the database, and does the actual clean up of the allocations in a separated thread

`DEL`명령등의 실행 시 블로킹 현상으로 인한 장애발생을 해결하기 위해 

`UNLINK`, `FLUSHALL`, `FLUSHDB`등의 명령이 추가되었고 이를 처리하기 위한 **LAZY_FREE**스레드가 추가되었습니다.

**하지만 여전히 대부분의 명령은 메인스레드에서 동작합니다.**

### v6.0

v6.0에서는 Threaded I/O가 추가되어 사용자 명령이 멀티쓰레드가 지원이됩니다.

I/O Socket Read/Write를 할 때 멀티스레드로 동작하여 전반적인 성능을 향상되었습니다.

5. 쓰레드 4번 jemalloc_bg_thd
   
   jemalloc background thread

<br>

**하지만 여전히 대부분의 명령은 메인스레드에서 동작합니다.**

v6.0에 대한 더 자세한 내용은 아래 링크에서 확인가능합니다.

> [Redis Tech Blog: Redis v6.0](https://redislabs.com/blog/diving-into-redis-6/)

***

## 요약

현대 하드웨어에서 지원하는 다중 소켓/다중 코어를 사용한다면 병렬처리를 통한 스레드 간 동기화가 매우 비쌉니다.

반면, 레디스와 같은 효율적인 스토리지 엔진의 병목 현상은 CPU의 원인이 아닙니다.

따라서 (동기화가 필요없는) 고립된 이벤트루프는 효율적이고 확장 가능한 서버를 구축하기에 좋은 설계일 것입니다.

성능관점에서 레디스의 주요 기능들은 `O(1)`의 복잡도로 매우 빠르게 처리되며 Atomic 하게 유지하는 목적으로

싱글스레드에서 최고 효율을 낼 수 있도록 설계되었다고 할 수 있습니다.

***

## Reference

<span class="reference">

[Redis Topic](https://redis.io/topics/faq#redis-is-single-threaded-how-can-i-exploit-multiple-cpu--cores)

[WHY Redis choose single thread (vs multi threads)](https://medium.com/@jychen7/sharing-redis-single-thread-vs-multi-threads-5870bd44d153)

[Redis is single-threaded, then how does it do concurrent I/O?](https://stackoverflow.com/questions/10489298/redis-is-single-threaded-then-how-does-it-do-concurrent-i-o/10495458#10495458)

[[입 개발] Redis 가 멀티스레드라구요?](https://charsyam.wordpress.com/2014/03/07/redis-%EA%B0%80-%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C%EB%9D%BC%EA%B5%AC%EC%9A%94/)

[Redis Server Threads 쓰레드](http://redisgate.kr/redis/configuration/redis_thread.php)

</span>
