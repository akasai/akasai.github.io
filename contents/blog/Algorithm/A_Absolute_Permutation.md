---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[HackerRank] Absolute Permutation"
url: "hr-absolute-permutation"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank", "Javascript"]
date: 2020-09-28
update_date: 2020-09-28
---
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d41c1ed-b707-4925-a36b-726cc66c7341%2Fhacker-rank-logo.png?table=block&id=62d1f9a2-d7ad-4c7e-bb71-ee02ff10d667&width=3260&userId=&cache=v2)

<br>

> [Absolute Permutation](https://www.hackerrank.com/challenges/absolute-permutation/problem)

***

## How To Solve

단순 순열문제로 판단하고 접근했다가 테스트케이스에서 낭패를 보았다.

단순히 차이값을 판단하고 `index`를 구하려했는데 그런 문제도 아니였다.

개인적으로 상당히 까다로웠던 문제였다.

1. 우선 특정 예외조건들은 따로 처리한다.

   `k === 0`이거나 조건이 성립할 수 없을 경우
   
2. 첫 연산은 무조건 `+`연산만 가능하다.

   이후 발생하는 연산은 조건에 맞게 이루어진다. 

<br>

## Solution

```javascript
function absolutePermutation (n, k) {
  const ret = []
  if (k === 0) {
    for (let i = 1; i <= n; i++) {
      ret.push(i)
    }
    return ret
  } else if ((n / k) % 2 !== 0) {
    return [-1]
  }

  let add = true
  for (let i = 1; i <= n; i++) {
    if (add) ret.push(i + k)
    else ret.push(i - k)

    if (i % k === 0) add = !add
  }
  return ret
}
```

### Test-case
```
1
100 2

3 4 1 2 7 8 5 6 11 12 9 10 15 16 13 14 19 20 17 
18 23 24 21 22 27 28 25 26 31 32 29 30 35 36 33 
34 39 40 37 38 43 44 41 42 47 48 45 46 51 52 49 
50 55 56 53 54 59 60 57 58 63 64 61 62 67 68 65 
66 71 72 69 70 75 76 73 74 79 80 77 78 83 84 81 
82 87 88 85 86 91 92 89 90 95 96 93 94 99 100 97 98

```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/36.Absolute_Permutation.js)

</span>
