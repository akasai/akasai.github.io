---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] Move Zeros"
url: "hr-move-zeroes"
description: "Leetcode / Problem Solving"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-09-28
update_date: 2020-09-28
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Move Zeros](https://leetcode.com/problems/move-zeroes)

***

## Solution

```typescript
function moveZeroes(nums: number[]): void {
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i--, 1)
      nums.push(0)
      len--
    }
  }
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/2.Move_Zeroes.ts)

</span>
