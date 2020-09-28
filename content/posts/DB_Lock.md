---
category: "개발/DB"
series: 0
title: "DB의 Lock/DeadLock"
url: "db-lock"
description: "Lock과 DeadLock에 대해 알아봅니다."
tags: ["Database", "Lock", "DeadLock", "교착상태", "Postgresql"]
date: 2020-09-28
update_date: 2020-09-28
---

## 교착상태(Dead Lock)란?

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F00e4c129-aba6-4bc6-b6cf-8343a7e2dd3c%2Fdeadlock.png?table=block&id=6474d42a-2a88-401e-8751-b7a49e39bd3a&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

모든 프로세스가 대기 상태이며 각 프로세스가 다른 프로세스가 가지고 있는 자원을 기다리고 있으면 `교착상태` 라고 한다.

데이터베이스 관점에서는 트랜젝션간 발생하는 것을 의미하며, 두 개의 트랜젝션이 각각의 트랜젝션이 가지고 있는 리소스의 Lock을 획득하려고 할 때 발생합니다.

<br>

### 교착상태 발생의 필요 충분 조건

네가지의 조건이 모두 충족되어야 교착상태가 발생한다.

1. **상호배제 (Mutual Exclusion)**

    한번에 한개의 프로세스만 자원을 사용할 수 있어야 한다.

2. **점유와 대기 (Hold and Wait)**

    프로세스가 한개의 자원을 점유하고 있고 추가적으로 다른 프로세스의 자원을 점유하기 위해서는 대기해야한다.

3. **비선점 (Non-preemption)**

    점유된 자원은 강제로 해제될 수 없고, 프로세스가 자원의 사용을 자발적을 해제하기 전까지 그 자원은 얻을 수 없다.

4. **환형 대기 (Circular Wait)**

    자원과 자원을 사용하기 위해 대기하는 프로세스들이 원형으로 구성되어 있어 자신에게 할당된 자원을 점유하면서 앞이나 뒤에 있는 프로세스의 자원을 요구해야 한다.

<br>

### 교착상태 예방 (Prevention)

필요충분 조건 중 한가지를 제거함으로써 교착상태가 발행하지 않도록 사전에 방지하는 방법.
이 방법은 자원 요청을 제한하여 교착상태를 예방한다. 자원낭비가 가장 심하다.

<br>

### 교착상태 회피 (Avoidance)

교착상태 회피 기법은 교착상태가 발생할 가능성을 배제하지 않고 교착상태가 발생하면 적절히 피해나가는 방법으로, 주로 [은행원 알고리즘(Banker's Algorithm)](https://jhnyang.tistory.com/102)이 사용된다.

<br>

### 교착상태 탐지 (Detection)

교착상태가 발생했는지 점검하여 교착상태에 있는 프로세스와 자원을 발견하는 것이다.

<br>

<span class="callout">
Postgresql은 자동으로 Deadlock을 인지하고 임의 트랜잭션을 취소하여 이를 해결합니다.
</span>

***

<br>

## 잠금(Lock)이란?

데이터의 무결성을 보장하기 위한 방법 중 한가지.

일반적으로 데이터베이스 락은 둘 혹은 그 이상의 사용자가 같은 시간에 같은 데이터를 업데이트하는 것을 방지하기 위해 존재한다. 

락이 걸린 데이터는 락이 풀릴 때까지 다른 사용자가 조작할 수 없다. 락은 `COMMIT` 이나 `ROLLBACK` 구문 이후에 풀리게 된다.

<br>

### 종류

1. **공유 Lock(Shared Lock, Read Lock)**

   데이터를 읽을 때 사용하는 Lock. `Select` 할 떄 주로 사용한다. 한 프로세스가 보고 있는 데이터를 다른 프로세스가 볼 수 있지만, 변경 작업 (`Update`, `Delete`)는 할 수 없다.

2. **베타적 Lock(Exclusive Lock, Write Lock)**

   데이터를 변경할 때 사용하는 Lock. `Insert`, `Update`, `Delete` 할 때 주로 사용한다. 락이 해제되기 전에는 다른 락 (공유 락, 베타적 락)을 설정할 수 없다. **즉. 읽기와 쓰기 모두 불가능하다.**

<br>

### Lock Level

Lock의 설정 대상(`Row`, `Database`)에 따라 나뉜다.

1. Row level

   `Row` 에만 락을 설정한다.

2. Page level

   Row가 담긴 `Page` 에만 락을 설정한다. 같은 페이지에 존재하는 모든 Row는 모두 잠긴다.

3. Table level

   `Table` 과 `Index` 모두에 락을 설정합니다. 

   **Select, Alter, Vacuum, Refresh, Index, Drop, Truncate**등 모든 작업이 잠깁니다.

4. Database level

   데이터베이스의 복구나 스키마 변경시 락을 설정합니다.

<br>

### Escalation

Lock의 임계치를 넘으면 Lock레벨이 확장되는 것.

Level이 낮을수록 동시성이 좋아지는 반면에 관리대상이 많아져 메모리효율이 떨어진다.

***

<br>

## 블로킹 (Blocking)

Lock들의 경합이 발생하여 특정 프로세스의 작업이 진행되지않고 멈춘 상태를 의미. `S-Lock/X-Lock`, `X-Lock/X-Lock`끼리 발생할 수 있다. 해결방법은 **Commit**, **Rollback**이 있다.

<br>

### 해결방안

1. SQL문 속도개선

2. Transaction 허용시간 단축

3. 동일한 데이터 수정작업 개선

4. 주 사용시간대 대용량 작업 지양

5. 대용량작업의 작업단위 분할 또는 lock시간 조율

***

<br>

## Reference

<span class="reference">

[[DB] Lock이란?](https://medium.com/@chrisjune_13837/db-lock-%EB%9D%BD%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-d908296d0279)

[[MSSQL] 교착상태 (DeadLock)](https://tora-it-kingdom.tistory.com/12)

[잠금(LOCK) 종류와 잠금수준](https://battleracoon.tistory.com/2)
</span>
