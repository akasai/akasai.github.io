---
category: "알고리즘"
series: 0
title: "[HackerRank] Grid Search"
url: "hr-grid-search"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-17
update_date: 2020-09-17
---
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d41c1ed-b707-4925-a36b-726cc66c7341/hacker-rank-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200920T122158Z&X-Amz-Expires=86400&X-Amz-Signature=8cc73aec6498288b3ab1b321118ec6618199eaa1f36ea897bd03a2b70077047b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hacker-rank-logo.png%22)

<br>

> [The Grid Search](https://www.hackerrank.com/challenges/the-grid-search/problem)

***

## Intro

다중 반복밖에 떠오르지가 않았다.

예전에 풀었던 문제중에 `BFS`와 비슷한 느낌이 들어서

비슷하게 접근해봤지만 잘 풀리지 않아서 결국 반복문으로 접근했다.

테스트 케이스를 다 통과하긴 했지만...

<br>

## How To Solve

2중 배열이라서 2중 반복을 통해 전체 숫자를 방문했다.

여기서 대상이 되는 패턴을 찾을 때 또 2중 반복을 하게되면

4중반복문이 된다는 생각에 다르게 접근해봤다.

크기를 이미 알고 있으므로 **index**를 이용하여 `while`문으로 한개씩 검증했다.

<br>

## Solution

```javascript
function gridSearch (G, P) {
  const r = G.length
  const c = G[0].length
  const gr = P.length
  const gc = P[0].length

  const grid = (i, j) => {
    let head = 0
    let pi = 0
    let pj = 0
    let di = i
    let dj = j

    while (head < gr * gc) {
      if (G[di][dj] === P[pi][pj]) {
        if (!P[pi][pj + 1]) {
          pi++
          pj = 0
          di++
          dj = j
        } else {
          pj++
          dj++
        }
      } else {
        return false
      }

      head++
    }
    return true
  }

  for (let i = 0; i <= r - gr; i++) {
    for (let j = 0; j <= c - gc; j++) {
      if (G[i][j] === P[0][0]) {
        if (grid(i, j)) return 'YES'
      }
    }
  }
  return 'NO'
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/32.The_Grid_Search.js)

</span>
