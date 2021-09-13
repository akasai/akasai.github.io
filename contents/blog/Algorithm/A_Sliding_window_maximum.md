---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] Sliding Window Maximum"
url: "lc-sliding-window-maximum"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-19
update_date: 2020-10-19
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum)

***

## How To Solve

처음에는 쉬운문제라고 생각했다.

2중 반복을 이용해서 각 **Window**를 돌면서 조건에 맞는 수를 찾는 방법으로

접근했다.

위 방법으로 해보니 테스트 케이스의 범위가 커졌을 경우 너무 오래걸렸다.

검색을 통해 `우선순위 큐`를 이용한 방법으로 개선해보았다.

원리는

**Window**가 한 칸씩 이동하므로 사실 상 매 반복마다 최대 2개의 값은 중복 체크를 하게된다.

이를 **Queue**에 담아서 불필요한 값들은 무시(?)하는 방식으로 진행하였다.

<br>

## Solution

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
  const answer = []
  const q = []

  for (let i = 0; i < nums.length; i++) {
    while (q.length >= 1 && nums[i] > q[q.length - 1]) q.pop()
    q.push(nums[i])

    const left = (i - k) + 1
    if (left >= 0) {
      answer.push(q[0])
      if (nums[left] === q[0]) q.shift()
    }
  }

  return answer
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/29.Sliding_Window_Maximum.ts)

</span>
