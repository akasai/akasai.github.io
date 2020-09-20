---
category: "알고리즘"
series: 0
title: "[HackerRank] The BomberMan Game"
url: "hr-bomberman-game"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-17
update_date: 2020-09-17
---
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d41c1ed-b707-4925-a36b-726cc66c7341/hacker-rank-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200920T122158Z&X-Amz-Expires=86400&X-Amz-Signature=8cc73aec6498288b3ab1b321118ec6618199eaa1f36ea897bd03a2b70077047b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hacker-rank-logo.png%22)

<br>

> [The Bomberman Game](https://www.hackerrank.com/challenges/bomber-man/problem)

***

## Intro

아직 익숙하지 않아서

문제를 처음보고 길찾기 문제를 먼저 떠올렸다.

`탐색`을 사용해야 하나 고민을 했던 문제 같다.

<br>

## How To Solve

우선 문제에서 제시된 규칙대로 하나씩 그려봤다.

10초 정도 그렸을 때 규칙성이 발견됬다.

단순히 첫 3초까지만 생각한다면 접근하기 어렵다.

`짝수`, `홀수` 일 경우 형태를 비교하면 쉽게 풀리는 문제같다.

<br>

## Solution

```javascript
function detonate (arr, i, j) {
  arr[i][j] = '.'
  if (i - 1 >= 0) arr[i - 1][j] = '.'
  if (j - 1 >= 0) arr[i][j - 1] = '.'
  if (i + 1 < arr.length) arr[i + 1][j] = '.'
  if (j + 1 < arr[0].length) arr[i][j + 1] = '.'
}

function bomberMan (n, grid) {
  if (n === 1) return grid

  const row = grid.length
  const col = grid[0].length

  let ret = new Array(row).fill(9).map(_ => new Array(col).fill(9))

  if (!(n % 2)) return ret.map(_ => 'O'.repeat(col))

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === '.' && ret[i][j] === 9) ret[i][j] = 'O'
      else if (grid[i][j] === 'O') detonate(ret, i, j)
    }
  }

  if ((n - 1) % 4 === 0) {
    grid = ret
    ret = new Array(row).fill(9).map(_ => new Array(col).fill(9))

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (grid[i][j] === '.' && ret[i][j] === 9) ret[i][j] = 'O'
        else if (grid[i][j] === 'O') detonate(ret, i, j)
      }
    }
  }
  return ret.map((r) => r.join(''))
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/33.The_Bomberman_Game.js)

</span>
