---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] String Compression"
url: "lc-string-compression"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-08
update_date: 2020-10-08
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [String Compression](https://leetcode.com/problems/string-compression)

***

## How To Solve

최소한의 반복으로 풀어보려고 했다.

깔끔한 것 같진 않지만...

input Array를 변조해야한다는 점이 좀 애매했다.

<br>

## Solution

```typescript
function compress(chars: string[]): number {
  let str = chars[0]
  let cnt = 1

  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === str[str.length - 1]) {
      cnt++
    } else {
      if (cnt > 1) str += cnt.toString()
      str += chars[i]
      cnt = 1
    }
  }

  if (cnt > 1) str += cnt.toString()
  chars.length = 0
  chars.push(...str.split(''))
  return chars.length
}

```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/18.String_Compression.ts)

</span>
