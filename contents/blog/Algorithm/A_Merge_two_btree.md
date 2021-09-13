---
draft: true
category: "알고리즘"
sub_category: "Solution"
series_name: ""
series_num: 0
title: "[Leetcode] Merge Two Binary Tree"
url: "lc-merge-b-tree"
description: "Leetcode / Problem Solving / Algorithm"
tags: ["Algorithm", "Leetcode", "Typescript"]
date: 2020-10-12
update_date: 2020-10-12
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Leetcode/leetcode-logo.png)

<br>

> [Merge Two Binary Tree](https://leetcode.com/problems/merge-two-binary-trees)

***

## How To Solve

**재귀**를 이용하여 풀었다.

탐색에 기본이 되는 형태라고 생각되어 정리한다.

탐색방법에 따라 다르겠지만 `DFS`의 첫 시작이 아닐까?

<br>

## Solution

```typescript
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number
  left: TreeNode
  right: TreeNode

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function mergeTrees(t1: TreeNode | null, t2: TreeNode | null): TreeNode | null {
  if (t1 === null) return t2
  if (t2 === null) return t1

  t1.val += t2.val
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)

  return t1
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Leetcode/Solution/23.Merge_Two_Binary_Trees.ts)

</span>
