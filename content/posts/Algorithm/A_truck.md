---
category: "알고리즘"
series: 0
title: "[Programmers] 다리를 지나는 트럭"
url: "hr-truck"
description: "Programmers / Problem Solving / Queue"
tags: ["Algorithm", "Programmers", "Javascript", "Queue"]
date: 2020-09-28
update_date: 2020-09-28
---
![](https://raw.githubusercontent.com/akasai/Algorithm-Solutions/master/Programmers/programmers-logo.png)

<br>

> [다리를 지나는 트럭](https://programmers.co.kr/learn/courses/30/lessons/42583)

***

## How To Solve

**Queue**를 이용하여 풀었다.

조건에 맞게 구현하는 문제인 것 같다.

고려해야 할 점은 진행시간대로 반복문을 돌리면 `Timeout`이 발생한다.

이를 해결하기 위해 time을 누적하는 방식으로 접근했다.

<br>

## Solution

```javascript
class Queue {
  constructor () {
    this.q = []
  }

  en (data) {
    this.q.push(data)
  }

  de () {
    this.q.shift()
  }

  get front () {
    return this.q[0]
  }

  get isEmpty () {
    return this.q.length === 0
  }
}

function solution (bridge_length, weight, truck_weights) {
  const bridge = new Queue()
  let time = 1
  let total_weight = 0
  let cur_truck = 0

  do {
    if (!bridge.isEmpty) {
      if (bridge.front.time === time) {
        total_weight -= bridge.front.data
        bridge.de()
      }
    }

    if ((total_weight < weight) && ((weight - total_weight) >= truck_weights[cur_truck]) && cur_truck < truck_weights.length) {
      bridge.en({ time: time + bridge_length, data: truck_weights[cur_truck] })
      total_weight += truck_weights[cur_truck]
      cur_truck++
      time++
    } else if (!bridge.isEmpty) {
      time = bridge.front.time
    }
  } while (cur_truck < truck_weights.length || !bridge.isEmpty)

  return time
}
```

***

<br>

## Reference

<span class="reference">

[Github](https://github.com/akasai/Algorithm-Solutions/blob/master/Programmers/%EC%8A%A4%ED%83%9D_%ED%81%90/2.%EB%8B%A4%EB%A6%AC%EB%A5%BC_%EC%A7%80%EB%82%98%EB%8A%94_%ED%8A%B8%EB%9F%AD.js)

</span>
