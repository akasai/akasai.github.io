---
category: "알고리즘"
series: "HackerRank"
title: "Larry's Array"
url: "hr-larry-array"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-17
update_date: 2020-09-17
---
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d41c1ed-b707-4925-a36b-726cc66c7341/hacker-rank-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200918%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200918T153912Z&X-Amz-Expires=86400&X-Amz-Signature=8c371c2e9e9a34df064bc6f21518878f92ab843261abef5895fdf498d3cbb972&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hacker-rank-logo.png%22)

<br>

> [Larry's Array](https://www.hackerrank.com/challenges/larrys-array/problem)

***

## Intro

문제 자체에서도 정렬을 언급하고 있어서

정렬의 변형문제라고 생각하고 접근했다.

<br>

## How To Solve

처음엔 단순히 주어진 조건으로 정렬이 가능한 부분 배열을 찾으려 했다.

문제에 주어지는 숫자는 순차적이라는 조건에서 힌트를 얻어

수학적 방법으로 접근했다.

문제의 조건상 숫자조합이 홀수로 나오게 되면 규칙을 통한 정렬이 불가능하다.

<br>

## Solution

```javascript
function larrysArray (A) {
  let count = 0
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = i + 1; j < A.length; j++) {
      if (A[i] > A[j]) {
        count++
      }
    }
  }
  return count % 2 === 0 ? 'YES' : 'NO'
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/31.Larry's_Array.js)

</span>
