---
category: "DevOps"
title: "apt와 apt-get의 차이점"
series_name: ""
series_num: 0
tags: ["데브옵스", "apt", "apt-get", "패키징"]
date: 2022-01-09
---

![](../img/devops/apt.jpeg)

Terminal에서 여러가지 실습을 하던 도중 `apt`와 `apt-get`에 모호함이 생겨서 

간단하게 이를 알아보았습니다.

***

## apt(Advanced Packaging Tool) 이란?

ubuntu환경에서 `*.deb`형식의 파일을 대상으로 하는 패키지 관리 cli입니다.

## apt와 apt-get의 차이

어떤 예제에선 `apt`를 사용한 패키지 설치를 예제로 하고 다른 곳에선
`apt-get`을 이용한 예제를 알려주고 있습니다.

이 둘의 차이점은 무엇일까요?

### apt-get

비교적 초기에 사용된 cli tool입니다.

**apt-get**은 패키지 설치를 **apt-cache**는 패키지 검색을 담당하고 있습니다.

오랜기간동안 사용되고 있기 때문에 **안정성과 호환성이 높으며**,

**다양한 옵션**을 제공하고 있습니다.

### apt

**apt**와 **apt-get**에서 사용률이 적은 옵션들을 제외하여 **경량화시킨 cli**입니다.

더 **직관적인 cli-ui를 제공**합니다.

## 결론

위에서 설명한 것과 같이 `apt`는 `apt-get`과 `apt-cache`을 기반으로 개발되어 내부동작은 동일합니다.

더 직관적이기 때문에 **Terminal환경에서 주로 작업할 때는 사용하기 좋습니다**.

다만, Script나 트러블 슈팅등의 **복잡한 작업을 수행할 때는 더 다양한 옵션을 제공하는**

**apt-get이 유리할 수 있습니다.**

<span class="em red">즉, 정답은 없습니다. 적합한 상황에서 유연하게 사용하면 됩니다.</span>
