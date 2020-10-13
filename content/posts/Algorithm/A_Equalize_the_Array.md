---
category: "알고리즘"
series: 0
title: "[HackerRank] Equalize the Array"
url: "hr-equalize-the-array"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank", "Javascript"]
date: 2020-09-20
update_date: 2020-09-20
---
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9d41c1ed-b707-4925-a36b-726cc66c7341%2Fhacker-rank-logo.png?table=block&id=62d1f9a2-d7ad-4c7e-bb71-ee02ff10d667&width=3260&userId=&cache=v2)

<br>

> [Equalize the Array](https://www.hackerrank.com/challenges/equality-in-a-array/problem)

***

## Solution

```javascript
function equalizeArray (arr) {
  const map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = map[arr[i]] ? ++map[arr[i]] : 1
  }

  const maxCount = Math.max(...Object.values(map))
  return arr.length - maxCount
}
```
***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/HackerRank/Implementation/3.Equalize_the_Array.js)

</span>
