---
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[HackerRank] Extra Long Factorials"
url: "hr-extra-Long-factorials"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank", "Javascript"]
date: 2020-09-20
update_date: 2020-09-20
---
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d41c1ed-b707-4925-a36b-726cc66c7341%2Fhacker-rank-logo.png?table=block&id=62d1f9a2-d7ad-4c7e-bb71-ee02ff10d667&width=3260&userId=&cache=v2)

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
