---
category: "알고리즘"
series: 0
title: "[HackerRank] Modified Kaprekar Numbers"
url: "hr-modified-kaprekar-numbers"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-20
update_date: 2020-09-20
---
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d41c1ed-b707-4925-a36b-726cc66c7341%2Fhacker-rank-logo.png?table=block&id=62d1f9a2-d7ad-4c7e-bb71-ee02ff10d667&width=3260&userId=&cache=v2)

<br>

> [Modified Kaprekar Numbers](https://www.hackerrank.com/challenges/kaprekar-numbers/problem)

***

## How To Solve

문제를 자세히 읽어보니

상세한 조건들이 모두 적혀있었다.

그대로 구현했다.

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

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/34.Modified_Kaprekar_Numbers.js)

</span>
