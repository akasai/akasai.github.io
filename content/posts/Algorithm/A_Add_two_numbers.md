---
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] Add Two Numbers"
url: "lc-add-two-numbers"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-13
update_date: 2020-10-13
---

![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [String Compression](https://leetcode.com/problems/add-two-numbers)

***

## How To Solve

앞서 풀어봤던 List순회와는 조금 다른 내용이였다.

첫 시도는 재귀를 이용하여 접근했는데

잘못생각한 것 같아서 포인터를 이용한 방법으로 접근했다.

<br>

## Solution

```typescript
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const answer = new ListNode()
  let head = answer
  let up = 0
  
  while(l1 || l2) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + up

    up = Math.floor(sum / 10)
    head.val = sum % 10

    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
    if (l1 || l2) {
      head.next = new ListNode()
      head = head.next
    }
  }
  
  if (up) head.next = new ListNode(up)
  return answer
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/26.Add_Two_Numbers.ts)

</span>
