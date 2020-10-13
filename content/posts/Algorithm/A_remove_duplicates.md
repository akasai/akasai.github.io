---
category: "알고리즘"
series: 0
title: "[Leetcode] Remove Duplicates from Sorted Array"
url: "hr-remove-duplicates"
description: "Leetcode / Problem Solving"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-09-28
update_date: 2020-09-28
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

***

## Solution

```typescript
function removeDuplicates(nums: number[]): number {
  if (nums.length < 2) return 1

  let j = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[j] !== nums[i]) nums[++j] = nums[i]
  }
  return j + 1
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/4.Remove_Duplicates_from_Sorted_Array.ts)

</span>
