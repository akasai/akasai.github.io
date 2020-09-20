---
category: "알고리즘"
series: 0
title: "[HackerRank] Equalize the Array"
url: "hr-equalize-the-array"
description: "HackerRank / Problem Solving / Implementation"
tags: ["Algorithm", "HackerRank"]
date: 2020-09-20
update_date: 2020-09-20
---
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d41c1ed-b707-4925-a36b-726cc66c7341/hacker-rank-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200920T122158Z&X-Amz-Expires=86400&X-Amz-Signature=8cc73aec6498288b3ab1b321118ec6618199eaa1f36ea897bd03a2b70077047b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22hacker-rank-logo.png%22)

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
