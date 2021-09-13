---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] First Bad Version"
url: "lc-first-bad-version"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Javascript"]
date: 2020-10-05
update_date: 2020-10-05
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [First Bad Version](https://leetcode.com/problems/first-bad-version)

***

## How To Solve

처음엔 단순히 반복문을 이용하여 풀었다.

하지만 진행시간대로 반복문을 돌리면 `Timeout`이 발생한다.

이를 해결하기 위해 이진탐색을 이용하여 접근했다.

<br>

## Solution

```javascript
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
      let left = 1
      let right = n
      
      while(left < right){
        const mid = parseInt((left + right) / 2)
        if (isBadVersion(mid)) {
          right = mid    
        } else {
          left = mid + 1
        }
      }
      return left
    }
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/11.First_Bad_Version.js)

</span>
