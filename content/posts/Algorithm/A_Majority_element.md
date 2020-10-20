---
category: "알고리즘"
series: 0
title: "[Leetcode] Majority Element" 
url: "lc-string-compression"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-20
update_date: 2020-10-20
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [String Compression](https://leetcode.com/problems/majority-element)

***

## How To Solve

처음에는 2중 반복문을 생각했다.

다시 생각해보니 카운팅류의 문제는 `Hash`를 사용하는게 좋을 것 같아서

다시 구성했다. 

Solution을 찾아보니 **분할정복**으로도 해결할 수 있다고 하는데...

<br>

## Solution

```typescript
function majorityElement(nums: number[]): number {
  const pivot = Math.floor(nums.length / 2)

  const countMap = nums.reduce((obj: any, v: number) => {
    if (obj[v]) obj[v]++
    else obj[v] = 1
    return obj
  }, {})

  let answer = 0
  for (const key in countMap) {
    if (countMap[key] > pivot) {
      answer = +key
      break
    }
  }
  return answer
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/32.Majority_Element.ts)

</span>
