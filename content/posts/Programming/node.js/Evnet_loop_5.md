---
category: "프로그래밍"
sub_category: "Node.js"
series_name: "Node.js 파헤치기"
series_num: 5
title: "Node.js 동작 원리"
url: "nodejs-5"
description: "Node.js 싱글스레드에 대하여 알아봅니다."
tags: ["Node.js", "Javascript", "V8", "Single Thread", "싱글스레드"]
date: 2020-10-21
update_date: 2020-10-21
---

간단한 예제 코드를 이용하여 싱글스레드의 특징을 알아보려한다.

***

<br>

## 예제 코드

암호화 함수인 `pbkdf2()`와 `http`통신을 이용한 예제를 바탕으로 Node.js의 비동기 처리방법을 파악해보려고 한다.

<br>

### pbkdf2

`crypto`모듈에 포함된 함수로 상당한 CPU작업을 요청하는 함수이다.

```javascript
const crypto = require('crypto')

const start = Date.now()
crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 1:', Date.now() - start)
})

// Result
Task 1: 910
```

위와 같이 사용하며 `PASSWORD`문자열에 `salt`를 붙히고 `sha512`암호화작업을 10만번 반복하는 단방향 암호화 함수이다.

작업을 실행하면 `910ms`의 시간을 소요한다. 약 1초가 걸리는 셈이다.

단순하게 생각하면 위 작업을 N번 반복하게되면 N초만큼의 시간이 소요된다고 유추할 수 있다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2437055-8faf-4826-9f4e-16555c21da33%2F_2020-10-12__2.56.45.png?table=block&id=3af5da26-38ab-4c2d-b9d8-53fc7ea36707&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

<br>

이 작업을 2번 반복해보면 2초가 나올까?

```javascript
const crypto = require('crypto')

const start = Date.now()
crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 1:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 2:', Date.now() - start)
})

// Result
Task 1: 904
Task 2: 910
```

예상과 다르게 위 결과 같은 약 `1초`가 소요되었다.

싱글 스레드라면 불가능한 작업시간이지만, 앞서 설명한 것처럼 해당 함수의 경우 메인 스레드가 아니라 <span class="em red">libuv가 생성하는 스레드풀의 스레드에서 처리되기 때문에 가능하다.</span>

<br>

Node.js가 생성하는 스레드풀의 defualt값은 4개라고 설명했는데 그렇다면 4개 이상의 작업은 어떻게 될까?

```javascript
const crypto = require('crypto')

const start = Date.now()
crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 1:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 2:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 3:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 4:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 5:', Date.now() - start)
})

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
  console.log('Task 6:', Date.now() - start)
})

// Result
Task 4: 983
Task 2: 990
Task 3: 992
Task 1: 996
Task 5: 1873
Task 6: 1879
```

실행 순서나 시간은 매번 차이가 있겠지만 예상 가능하듯이 약 `2초`의 시간이 소요되었다.

즉, libuv에서 생성하는 4개의 default 스레드를 사용한다는 것을 확인할 수 있다.

<span class="callout">for문을 사용해도 동일한 결과를 볼 수 있다.</span>

<br>

### Network I/O

그렇다면 Network I/O는 어떤 방식으로 처리가 될까?

`https`모듈을 통해 확인해보았다.

```javascript
const https = require('https')
const start = Date.now()

https.request('https://www.google.com', (res) => {
  res.on('data', () => {})
  res.on('end', () => {
    console.log('Https 1:', Date.now() - start)
  })
}).end()

// Result
Https 1: 334
```

google로 request를 보내고 오는 응답에 대한 처리속도는 위와 같다.

<br>

그렇다면 N번의 요청의 경우 예상한 결과와 같을까?

```javascript
const https = require('https')
const start = Date.now()

https.request('https://www.google.com', (res) => {
  res.on('data', () => {})
  res.on('end', () => {
    console.log('Https 1:', Date.now() - start)
  })
}).end()

https.request('https://www.google.com', (res) => {
  res.on('data', () => {})
  res.on('end', () => {
    console.log('Https 2:', Date.now() - start)
  })
}).end()

// Result
Https 1: 318
Https 2: 322
```

2번의 요청까지는 병렬로 처리되는 것을 확인할 수 있었다. 그렇다면 위의 상황처럼 4개 이상의 작업은 어떻게 처리될까?

```javascript
const https = require('https')
const start = Date.now()

for (let i = 0 i < 11 i++) {
  https.request('https://www.google.com', res => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log(`Https ${i+1}:`, Date.now() - start)
    })
  }).end()
}

// Result
Http 3: 318
Https 10: 322
Https 11: 323
Https 5: 331
Https 2: 332
Https 8: 332
Https 1: 334
Https 6: 334
Https 9: 334
Https 4: 335
Https 7: 336
```

위 결과가 보여주듯 Network I/O 작업의 경우 위 쪽에서 테스트해본 `pbkdf2`함수와 달리 libuv의 스레드를 사용하지 않는다는 것을 확인할 수 있었다.

실제로 Network I/O의 경우 운영체제의 Process에서 처리된다.

<br>

## 응용

위 결과와 별개로 다양한 케이스를 테스트해보았다.

<br>

### 스레드풀 확장

libuv의 default 스레드풀은 4개라고 한다. 이를 확장시켜보면 위 테스트는 다른 결과를 보여준다.

`process.env.UV_THREADPOOL_SIZE` 변수를 변경하여 libuv의 스레드풀 사이즈를 설정할 수 있다.

```javascript
process.env.UV_THREADPOOL_SIZE = 10

const crypto = require('crypto')
const start = Date.now()

for (let i = 0 i < 10 i++) {
	crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
		console.log(`Task ${i+1}:`, Date.now() - start)
	})
}

// Result
Task 8: 1858
Task 4: 1865
Task 3: 1892
Task 9: 1900
Task 1: 1902
Task 7: 1908
Task 5: 1915
Task 6: 1920
Task 10: 1924
Task 2: 1930
```

스레드풀을 10개로 늘리고 테스트를 해보았다. 예상대로 병렬처리되어 동시에 작업이 끝났다.

하지만 한가지 이상한 점은 미묘하게 소요시간이 늘어났다는 점이다 (1초 -> 2초)

CPU의 성능에 영향을 받는 작업이다보니 한정된 자원에서 처리하여 소요시간이 늘어나는 것이다.

<br>

### Network I/O & pbkdf2

`Network I/O`작업은 운영체제의 Process에서 `암호화` 작업은 libuv의 스레드에서 진행되는 것을 확인 하였다.

그렇다면 둘을 동시에 처리하는 경우는 어떻게 될까?

*사실 무의미한 테스트였을지도...*

```javascript
const https = require('https')
const crypto = require('crypto')
const start = Date.now()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 1:', Date.now() - start)
})

https.request('https://www.google.com', (res) => {
	res.on('data', () => {})
	res.on('end', () => {
		console.log('Https 1:', Date.now() - start)
	})
}).end()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 2:', Date.now() - start)
})

// Result
Htttps 1: 633
Task 1: 883
Task 2: 900
```

넌블락킹 I/O작업 두 종류가 순차적으로 돌면서 빠르게 끝난 순서대로 출력되는 것을 볼 수 있다. 

만약 스레드풀의 수를 1개로 제한하면 어떻게 될까?

```javascript
rocess.env.UV_THREADPOOL_SIZE = 1
const https = require('https')
const crypto = require('crypto')
const start = Date.now()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 1:', Date.now() - start)
})

https.request('https://www.google.com', (res) => {
	res.on('data', () => {})
	res.on('end', () => {
		console.log('Https 1:', Date.now() - start)
	})
}).end()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 2:', Date.now() - start)
})

// Result
Task 1: 881
Https 1: 1171
Task 2: 1772
```

스레드 풀을 제한하면 위의 결과대로 실행된 순서를 정확히 지키며 실행된다.

두 가지 상이한 결과를 바탕으로 볼 때 **어느정도 스레드를 활용한다는 것이 확인된다.**

<br>

```javascript
// process.env.UV_THREADPOOL_SIZE = 1
const https = require('https')
const crypto = require('crypto')
const start = Date.now()

https.request('https://www.google.com', (res) => {
	res.on('data', () => {})
	res.on('end', () => {
		console.log('Https 1:', Date.now() - start)
	})
}).end()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 1:', Date.now() - start)
})

https.request('https://www.google.com', (res) => {
	res.on('data', () => {})
	res.on('end', () => {
		console.log('Https 2:', Date.now() - start)
	})
}).end()

crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
	console.log('Task 2:', Date.now() - start)
})

console.log(`Callback 1:`, Date.now() - start)
console.log(`Callback 2:`, Date.now() - start)

// Result: Thread 4
Callback 1: 24
Callback 2: 27
Https 2: 320
Https 1: 329
Task 1: 964
Task 2: 967

// Result: Thread 1
Callback 1: 23
Callback 2: 24
Https 1: 316
Task 1: 1057
Https 2: 1343
Task 2: 2099
```

default환경에서는 콜스택에서 빠르게 처리되는 `console.log`는 가장 먼저 처리되며 나머지 `I/O`작업들은 순차적으로 처리되어

예상가능한 소요시간을 보여준다.

하지만 스래드가 1개일 때는 콜스택에서 바로 수행되는 `console.log`를 제외한 모든 `I/O`작업을 한 개의 스레드에서 수행하기 때문에 마지 블로킹된 것처럼 순차처리가 된다.

<br>

여러 테스트 도중 `for`문을 이용한 방법의 결과가 가장 예측불가능 했다.

뚜렷한 이유를 파악하진 못했지만 각각의 `for`문이 동작하면서 처리되는 순서의 차이가 발생하는게 아닐까 추측해본다.

```javascript
const https = require('https')
const crypto = require('crypto')
const start = Date.now()

for (let i = 0 i < 5 i++) {
	console.log(`Console.log ${i+1}:`, Date.now() - start)
}

for (let i = 0 i < 5 i++) {
	https.request('https://www.google.com', res => {
		res.on('data', () => {})
		res.on('end', () => {
		  console.log(`Https ${i+1}:`, Date.now() - start)
		})
	  }).end()
}

for (let i = 0 i < 5 i++) {
	crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
		console.log(`Task ${i+1}:`, Date.now() - start)
	})
}

// Result
Console.log 1: 0
Console.log 2: 2
Console.log 3: 3
Console.log 4: 3
Console.log 5: 3
Https 3: 321
Https 2: 321
Https 1: 322
Task 2: 979
Task 4: 983
Task 1: 986
Task 3: 993
Https 5: 1260
Https 4: 1271
Task 5: 1869
```

<br>

콜백함수를 이용한 테스트 역시 위 결과를 바탕으로 이해가 가는 결과를 보여주었다.

```javascript
const https = require('https')
const crypto = require('crypto')
const start = Date.now()
const fn = (num) => setTimeout(()=> {
	console.log(`Callback ${num}:`, Date.now() - start)
}, 1000)

for (let i = 0 i < 5 i++) {
	fn(i+1)
}

for (let i = 0 i < 5 i++) {
	https.request('https://www.google.com', res => {
		res.on('data', () => {})
		res.on('end', () => {
		  console.log(`Https ${i+1}:`, Date.now() - start)
		})
	  }).end()
}

for (let i = 0 i < 5 i++) {
	crypto.pbkdf2('PASSWORD', 'salt', 100000, 512, 'sha512', () => {
		console.log(`Task ${i+1}:`, Date.now() - start)
	})
}

// Result
Https 1: 320
Https 2: 326
Https 3: 328
Task 3: 1004
Callback 1: 1005
Callback 2: 1005
Callback 3: 1005
Callback 4: 1005
Callback 5: 1005
Task 1: 1007
Task 2: 1021
Task 4: 1029
Https 5: 1297
Https 4: 1368
Task 5: 1882
```
***

<br>

## 결론

다양한 케이스를 통해 Node.js의 스레드를 살펴봤다.

실제 서버를 구현하면 좀 더 복잡하겠지만 대략적인 내용을 알 수 있었다.

단순하게 설명하면 한 개의 콜스택을 통해 작업을 처리하는 특징을 통해 **"Node.js는 싱글 스레드이다."** 라고 설명할 수도 있다.

하지만, 다양한 비동기 작업, I/O, Network 작업등을 고려한다면 위 설명처럼 싱글스레드 만으로는 성능적 제약이 있을 것이다.

이런 부분들을 해결하기 위해 Node.js는 OS를 적극 사용하며, 자체적(libuv)으로 스레드를 생성하여 부하가 발생하는(CPU Intensive) 작업들을 스레드에서 처리한다.

따라서 <span class="em red">Node.js는 무조건 싱글스레드라고 할 수는 없다.</span>

***

<br>

## Reference

<span class="reference">

[[NodeJS] nodejs는 single-thread가 아니다](https://medium.com/@rpf5573/nodejs-nodejs%EB%8A%94-single-thread%EA%B0%80-%EC%95%84%EB%8B%88%EB%8B%A4-f02b0278c390)

</span>
