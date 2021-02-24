---
category: "프로그래밍"
sub_category: "아키텍처"
series_name: ""
series_num: 0
title: "MSA(Microservice Architecture)이란?"
url: "what-is-msa"
description: "마이크로 서비스 아키텍처에 대하여 정리합니다."
tags: ["마이크로 서비스", "아키텍처", "Microservice", "Architecture"]
date: 2021-02-24
update_date: 2021-02-24
---

![](../img/msa1.png)

실무에서 실제로 사용중인 아키텍처 패턴인 MSA에 대하여 간략히 알아보았습니다.

***

## MSA(Microservice Architecture)란?

Microservice Architecture의 약자로 독립적인 배포가 가능한 서비스들로 구성된 아키텍처라고 요약할 수 있습니다.

> In short, the microservice architectural style is an approach to developing a single application as a suite of small services,
> each running in its own process and communicating with lightweight mechanisms, 
> often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. 
> There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

위 문장에서 표현하듯  독립적으로 배포가 가능하고(independently deployable) 각각 동작하는(each running in its own process) 작은 서비스(small services)입니다.

***

## 등장배경

Enterprise 환경에서 서비스의 크기가 커짐에 따라 모놀리식(Monolithic) Architecture의 한계점이 발생하였습니다.

<span class="callout">
<b>모놀리식(Monolithic) 아키텍처</b>
<br>
소프트위어의 모든 구성요소가 한 곳에서 관리되는 아키텍처.
유지보스가 용이하여 소규모 프로젝트에서 합리적이다.
</span>

![](../img/msa2.png)

### 모놀리식(Monolithic) 아키텍처의 한계점

1. 서비스가 커질수록 개발내용의 영향도 파악 / 시스템 구조 파악이 어려움.
   
2. 빌드/테스트 시간의 증가로 인한 배포 시간의 증가.
   
3. 특정 서비스(기능)의 Scaling(Scale Out, Scale Up 등)이 어려움.
   
4. 일부분의 장애가 전체 장애가 될 가능성이 큼.
   
5. 특정 개발언어에 종속적.

***

## MSA의 특징

1. **독립적인 배포가 가능 (Independently deployable)**

   서비스 단위로 분리되었기 때문에 각각의 서비스들을 독립적으로 배포할 수 있습니다.

2. **느슨한 결합 (Loosely coupled)**

   각 서비스에 대한 의존성을 최소화하므로 결합도가 낮습니다.

3. **높은 유지성, 테스트 가능성 (Highly maintainable and testable)**

   분리된 서비스별로 관리되기 때문에 유지하기 편하고 테스트도 독립적으로 가능합니다.

4. **팀 단위 구성이 가능 (Owned by a small team)**

   서비스 단위로 팀 구성을 하여 개발/운영 할 수 있습니다.

5. **사업 단위(서비스 단위)의 조직 (Organized around business capabilities)**

   각 서비스의 단위를 사업의 단위로 판단할 수 있습니다.

### MSA에서의 Service

MSA 환경에서 Service를 정의하자면 다음과 같이 표현할 수 있습니다.

1. 독립적인 배포가 가능한 단위
   
2. 서로 간의 의존성이 최소화되는 단위
   
3. 개별적인 프로세스로 동작하는 단위
   
4. 서로 간 가벼운 방식(REST, RPC 등)을 통한 통신
   
5. 크기가 작을 뿐 하나의 모놀리식 구조와 유사한 단위

***

## MSA의 장단

### 장점

1. 서비스별 독립적인 배포가 가능하다.

   계속 언급되는 특징이지만 가장 큰 특징이자 장점이라고 볼 수 있습니다.
   전체 서비스의 중단없이 개별적인 서비스를 자유롭게 배포할 수 있습니다.

2. Scaling

   모놀리식의 한계점을 극복할 수 있습니다.
   모놀리식 환경과 달리 특정 서비스의 부하로 스케일링이 필요할 경우  해당 서비스만 별도로 확장이 가능합니다. 클라우드 환경에서는 적합하다고 볼 수 있습니다.

3. 장애 대응

   모놀리식 환경에서는 일부의 장애가 전체 서비스의 장애가 될 가능성이 높습니다.
   하지만 분리된 환경에서 일부의 장애는 전체 서비스에 큰 영향을 미치지 않습니다.

   상대적으로 부분적 장애 격리가 수월하지만, 의존도에 따라서 장애 확산의 가능성은 분명 존재합니다.

4. 폴리글랏

   한 가지 언어에 종속되는 모놀리식 환경의 특징과 달리 각 서비스 다양한 언어/환경에서 구성이 가능합니다. 따라서 전체 서비스에 영향을 주지 않고 신기술 적용이 용이합니다.

### 단점

1. 성능

   분리된 서비스는 리소스를 소모합니다. 모놀리식 환경에서는 없는 각 서비스 간의 추가적인 통신이 필요합니다.
   그로 인해 Latency가 증가하고 이를 해결할 추가적인 방법이 필요합니다.

2. 트랜잭션

   MSA의 큰 단점 중 한 개입니다. 물리적으로 서비스가 분리되어 있어 트랜잭션의 복잡도가 증가합니다.
   분산 트랜잭션에 대한 대응이 없다면 데이터의 일관성에서 장애 요소가 존재합니다.

3. 테스트

   서비스가 분산되어 있기 때문에 통합 테스트에 대한 불편함이 증가합니다. 
   각각의 서비스를 테스트할 수 있다는 장점은 있지만, 전체 서비스에 대한 테스트를 위해 다양한 방법을 고려해야 합니다.

4. 데이터

   물리적으로 분리되는 서비스의 특징 때문에 데이터 역시 분산될 가능성이 높습니다(DB의 분리). 
   이로 인해 데이터의 조회가 어렵고 정합성을 보장하는데 어려움이 있습니다.

***

## 마무리

![](../img/msa3.png)

클라우드 환경의 등장과 컨테이너 기술들의 발전으로 현재 가장 많은 관심을 받는 아키텍처라고 생각합니다.

심지어는 개발의 시작부터 MSA를 고려하는 상황도 발생하고 있습니다.

많은 장점이 있는 아키텍처이지만 그만큼 단점이나 고려야 할 부분도 많이 존재합니다.

모든 아키텍처 설계가 그렇듯 개발에 앞서 사용해야 할 정당한 근거 아래 도입해야 합리적인 선택이 되리라 생각합니다.

> 1. 비용: 특정 서비스 아키텍처를 도입할 경우 비용을 얼마나 절감할 수 있는가?
>
> 2. 개발 생산성: 마이크로서비스를 요구할 만큼 시스템 복잡도가 높은가? 또는 복잡도를 지나치게 높인 마이크로서비스가 생산성을 저해하고 있지는 않은가?
>   
> 3. 운영: 개발팀에게 개발과 운영을 동시에 요구할 만큼 인프라가 준비되어 있는가?

***

## Reference

<span class="reference">

[Microservices](https://martinfowler.com/articles/microservices.html)

[마이크로서비스 – MicroServices](http://channy.creation.net/articles/microservices-by-james_lewes-martin_fowler)

[Microservice Architecture](https://microservices.io/index.html)

[Do Not Use MSA - 마이크로서비스 아키텍처가 꼭 필요한가요?](https://www.samsungsds.com/kr/insights/msa.html)

</span>
