---
category: "개발/기타"
title: "Local 저장소와 Github 연결하기"
url: "Connect-to-github"
description: "Git 명령어를 정리해봅니다."
tags: ["Github", "Git"]
date: 2020-09-16
update_date: 2020-09-16
---

local에서 첫 개발을 시작하고 Github repository에 push를 할 단계가 온다.

## Git 초기화

```bash
$ git init
```

위 명령어를 이용하여 git을 초기화한다.

방금 초기화 했다면 당연히 안되어 있겠지만, 
 
local 저장소가 원격저장소와 연결되어 있는지 확인한다. 

## Git Remote 연결

```bash
$ git remote
origin // 일반적으로 설정하는 원격저장소 이름
```

연결되어 있지 않다면 아무것도 뜨지 않는다.

만들어 둔 github repository를 local 저장소와 연결한다.

```bash
$ git remote add [remote name] [github reposit url]
```

계정과 비밀번호를 치면 github과 연결되며 이후 일반적인 git명령어를 통해 조작할 수 있다.

## Git Remote 제거

```bash
$ git remote remove [remote name]
```

## Git Remote 이름 변경

```bash
$ git remote rename [remote name] [new remote name]
```
