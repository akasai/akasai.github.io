---
category: "DB"
sub_category: "Redis"
series_name: "Redis 파헤치기"
series_num: 1
title: "Redis란?"
url: "what-is-redis"
description: "Redis의 특징을 알아봅니다."
tags: ["Redis", "레디스", "NoSQL"]
date: 2021-01-20
update_date: 2021-01-20
---

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F92ea1c01-48c8-41e5-80e6-082ea9eed282%2F1200px-Redis_Logo.svg.png?table=block&id=0ac5fa14-b0a1-436d-979e-644cfcaeaaa2&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

개인적으로 가장 좋아하는 **NoSQL DBMS가 Redis**입니다.

실무에서 기존부터 사용하고 있다 보니 자연스럽게 익숙해진 것 같습니다.

몇몇 특징들을 대충 알고는 있었지만 이번 기회에 자세히 알아보았습니다.

***

## 레디스란?

Redis(레디스)는 **REmote DIctionary Server**의 약자로 오픈소스(BSD licensed) DBMS입니다.

In-memory(인메모리) 데이터 저장소이며, Key-Value기반의 NoSQL DBMS입니다.

보통 DB, Cache(캐시), 메시지 브로커 등의 용도로 사용합니다.

> For instance, using pipelining Redis running on an average Linux system can deliver even 1 million requests per second.
 
초당 10만 ~ 15만건의 명령을 수행할 수 있으며, 위 공식문서의 내용처럼 파이프링을 통해

리눅스시스템에서 초당 100만건의 요청도 수행이 가능하다고 합니다.

### 용어

1. RSS (Resident Set Size)

   실제 메모리 사용

2. AOF (Append Only File)
   
   명령이 발생할 때마다 기록하는 장소

   서버가 재시작 할 시 write/update를 순차적으로 재실행, 데이터를 복

3. COW (Copy On Write)

   레디스가 데이터를 쓰기 위해 사용하는 매커니즘

***

## 레디스의 특징

1. 싱글스레드 기반 명령 수행

   이를 통해 **Atomic operations**을 보장하며 **Concurrency(동시성)**를 지원합니다.

2. Key-Value 기반으로 데이터 저장

3. 다양한 DataType 지원

   레디스는 비슷한 NoSQL DBMS대비 다양한 타입을 제공합니다.

   (`strings`, `hashes`, `lists`, `sets`, `sorted sets`, 

   `bitmaps`, `hyperloglogs`, `geospatial indexes`, `streams`)

   이를 이용하여 **개발 편의성을 극대화** 할 수 있습니다.

   `Lists`의 경우 일반적인 RDB와 비교하면 10배 빠른 속도를 지원합니다.

4. Master-Slave 구성이 가능

   Master-Slave와 같은 **Redis Replication** 뿐만 아니라 **Redis cluster**를 이용한 분산처리, **Redis Sentinel**을 이용한 장애복구 시스템을 제공합니다.

### Copy On Write

레디스의 프로세스들은 Resource(자원)을 공유하고 있습니다.

데이터에 대한 Write(쓰기)명령이 발생하면 프로세스는 `fork()`되고 쓰기 대상이 되는 자원을 `Copy`한 뒤 명령을 수행합니다.

이와 같은 특징 때문에 레디스는 메모리공간을 2배로 사용하게 되며, 메모리 파편화가 발생하기 쉽습니다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F10ec7784-d8c4-4dda-a7b3-0b8646207135%2Fcopy-on-write-2-modify-page.png?table=block&id=e0063b18-f36b-47ec-ba93-fa0bf1884829&width=2580&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

**COW**가 발생하는 상황은 다음과 같습니다.

1. save 파라미터 (RDB 파일)

2. BGSAVE 명령 (RDB 파일)

3. 복제 Replication (RDB 파일)

4. auto-aof-rewrite-percentage 파라미터 (AOF)

5. BGREWRITEAOF 명령 (AOF)

*** 

## 주의할 명

### keys

레디스에 존재하는 모든 key를 조회. (레디스 매뉴얼에도 운영환경에서는 사용하지 말 것을 권고함)

`scan`을 통해 순회 탐색으로 전체 key 조회

### smem

`Sets` 자료구조의 모든 member들을 조회.

`sscan`을 통한 순회 탐색으로 전체 member 조회

### flushall

전체 데이터를 지우는 명령어로, 키 갯수에 비례한 수행시간

***

## 요약

레디스는 빠른속도와 강력한 기능을 제공하는 만큼 사용시 주의를 기울여야하는 저장소입니다.

중요기능에 사용되는 만큼 Critical한 장애가 발생할 수 있기 때문입니다.

***

## Reference

<span class="reference">

[Redis](https://redis.io)

[Redis를 운영하면서 반드시 알아야할 내용들](https://taes-k.github.io/2020/07/23/redis-essential)

[Redis 개념과 특징](https://goodgid.github.io/Redis)

[개발자를 위한 레디스 튜토리얼 01](https://meetup.toast.com/posts/224)

[Redis Copy-on-Write 분석](http://redisgate.kr/redis/configuration/copy-on-write.php)

</span>
