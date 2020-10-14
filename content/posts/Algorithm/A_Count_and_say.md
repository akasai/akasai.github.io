---
category: "알고리즘"
series: 0
title: "[Leetcode] Count And Say"
url: "lc-count-and-say"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-14
update_date: 2020-10-14
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Count and Say](https://leetcode.com/problems/count-and-say)

***

## How To Solve

처음에 문제가 잘 이해안가서

검색을 해봤더니 존재하는(?) 수열이였다.

[읽고 말하기 수열](https://ko.wikipedia.org/wiki/%EC%9D%BD%EA%B3%A0_%EB%A7%90%ED%95%98%EA%B8%B0_%EC%88%98%EC%97%B4) 라고 해서 소설 '개미'에 나왔다고 한다.

수열이라길래 "*아! 점화식이 있겠네!!!*" 라고 생각하고 봤는데....

71차 다항식이였다....

무작정 구해보자 생각하고 `반복문`과 `메모이제이션(?)`을 활용해보았다.

다행히 한번에 풀었는데 문제속에 재귀가 언급되어서 재귀함수로도 구현했다.

> You can do so recursively

정수범위를 정해놔서 가능한 것 같다. 

> 1 ≤ n ≤ 30

<br>

## Solution

### 반복문
```typescript
function countAndSay(n: number): string {
  const arr = new Array(n).fill('1')
  for (let i = 1; i < n; i++) {
    const num = arr[i - 1].toString()

    let str = ''
    for (let i = 0, count = 1; i <= num.length - 1; i++) {
      if (num[i] !== num[i + 1]) {
        str += `${count}${num[i]}`
        count = 1
      } else {
        count++
      }
    }
    arr[i] = str
  }
  return arr[n - 1]
}
```

<br>

### 재귀
```typescript
function countAndSay(n: number): string {
  if (n === 1) return '1'

  const num = countAndSay(n - 1)
  let str = ''
  for (let i = 0, count = 1; i < num.length; i++) {
    if (num[i] !== num[i + 1]) {
      str += `${count}${num[i]}`
      count = 1
    } else {
      count++
    }
  }

  return str
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/27.Count_and_Say.ts)

</span>
