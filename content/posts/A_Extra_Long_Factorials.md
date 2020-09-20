---
category: "알고리즘"
series: 0
title: "[HackerRank] Extra Long Factorials"
url: "hr-extra-Long-factorials"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-20
update_date: 2020-09-20
---
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d41c1ed-b707-4925-a36b-726cc66c7341/hacker-rank-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200920T122158Z&X-Amz-Expires=86400&X-Amz-Signature=8cc73aec6498288b3ab1b321118ec6618199eaa1f36ea897bd03a2b70077047b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hacker-rank-logo.png%22)

<br>

> [Extra Long Factorials](https://www.hackerrank.com/challenges/extra-long-factorials/problem)

***

## How To Solve

BigInt에 대한 연산을 묻는 문제라고 생각했다.

단 출력할 때는 `String`으로 출력한다.

<br>

## Solution

```javascript
function kaprekarNumbers (p, q) {
  const ret = []
  for (let i = p; i <= q; i++) {
    const square = (i * i).toString()
    const d = i.toString().length

    const r = square.slice(-d)
    const l = square.slice(0, square.length - d)
    if (i === (+r + +l)) ret.push(i)
  }
  return !ret.length ? 'INVALID RANGE' : ret.join(' ')
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/35.Extra_Long_Factorials.js)

</span>
