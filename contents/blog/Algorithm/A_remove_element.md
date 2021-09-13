---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] Remove Element"
url: "hr-remove-element"
description: "Leetcode / Problem Solving"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-09-28
update_date: 2020-09-28
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Remove Element](https://leetcode.com/problems/remove-element)

***

## Solution

```typescript
function removeElement(nums: number[], val: number): number {
  const idx = nums.indexOf(val)

  if (idx === -1) return nums.length

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i--, 1)
    }
  }

  return nums.length
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/3.Remove_Element.ts)

</span>
