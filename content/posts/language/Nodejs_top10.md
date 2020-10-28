---
category: "개발/Node.js"
series: 0
title: "2020 TOP 10 Node.js Package & Framework"
url: "nodejs-top10"
description: "주로 사용되는 Node.js의 Package & Framework를 알아봅니다."
tags: ["Node.js", "Javascript", "Typescript", "NPM", "Framework", "Express"]
date: 2020-10-12
update_date: 2020-10-12
---

좀 ... 이른감이 있지만

몇몇 해외블로그에서 TOP 10을 정리한 글이 있어서 

정리해본다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff8cfecd0-47de-4f0e-a5b9-165db0a86a4a%2F1_Jw9V__6jYhm2amP74D_0lw.png?table=block&id=6699eaed-7739-4978-a50c-d2f170709647&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## NPM Package TOP 10

1. [Express](https://expressjs.com/)

   가장 유명한 Server Framework가 아닐까?

2. [PM2](https://pm2.keymetrics.io/)

   대표적인 Node.js Application의 process관리 도구이다.
   
3. [Mocha](https://mochajs.org)

   Javascript test framework다. 다양한 방법으로 테스트케이스 수행을 도와준다.
   아직까지는 **[Jest](http://jestjs.io/)**보다 사용량이 많은가보다.
   
   난 모카를 사용하다가 최근엔 Jest를 주로 사용하고 있다.

4. [Lodash](https://lodash.com/)

   Javascript 유틸리티 라이브러리이다. JS를 사용할 때 다소 불편한 부분들에 대한 기능을 제공한다.
   여러가지 이슈등으로 뜨거운 감자이지만, 아직 사용량은 많은 것 같다.

   레거시라고 생각되어 최대한 사용을 지양하고 있다.

5. [ESLint](https://eslint.org/)

   코드 컨벤션등 정적코드분석 툴이다. IDE의존도를 낮출 수 있다.

   난... IDE(Webstorm)의존도가 높아서 거의 사용하진 않는다.
   더군다나 Typescript를 주로사용하고 있어서 ESLint보다 **[TSLint](https://palantir.github.io/tslint/)**를 사용하게 되는 것 같다.

6. [Passport](http://www.passportjs.org/)

   각종 인증관련 모듈들을 전략패턴을 통해 제공해주는 패키지다. 다양한 인증체계를 지원하고, 커스텀도 가능해서 꽤 강력한 도구다.
   다만, 국내 서비스 인증은 해외 인증에 비해 다양하지 않다.
   
   내가 한창 개발할 때는 전혀 없었는데 최근에 Contribute된 것 같다.

   [Kakao](http://www.passportjs.org/packages/passport-kakao/)<br>
   [Naver](http://www.passportjs.org/packages/passport-naver/)

7. [Moment](https://momentjs.com/)

   시간 데이터를 조작하는 강력한 툴이(였)다.
   최근에 **[레거시 프로젝트](https://momentjs.com/docs/#/-project-status/)**로 변경되어서 더 이상에 피쳐/이슈 해결은 없을 것으로 보인다.
   다행히 권장모듈을 추천해주고 있다.

   [Luxon](https://moment.github.io/luxon/)<br>
   [Day.js](https://day.js.org/)<br>
   [Date-fns](https://date-fns.org/)<br>
   [js-joda](https://js-joda.github.io/js-joda/)

8. [Chalk](https://github.com/chalk/chalk)

   `console.log()`를 꾸며주는 패키지인 것 같다. 딱히 써보지 않아서 잘 모르겠다.

9. [Socket.io](https://socket.io/)

   **Real-time communication application**을 구축하는데 거의 필수적인 패키지가 아닐까?
   과장을 좀 더하면 Node.js를 사용하는 이유라고 봐도 될 것 같다.

10. [Request-Promise](https://github.com/request/request-promise)

   http 콜을 프로미스 형태로 반환하는 패키지이다. ES6이후 `Promise`객체의 등장으로 거의 필수적으로 사용되고 있다.
   하지만 **2020/02/11**기준 공식적으로 관련 패키지들이 `Deprecated`되었다.

   권장 패키지들을 추천해주고 있다.

   [Recommend](https://github.com/request/request/issues/3143)

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F248a1043-0b3b-4978-92f6-6db728e162ab%2F786d30e016fad2cb7dc2c76af86d55f6afd277dd5a8a80dd17b13332bfe0131f.png?table=block&id=e57970b8-fc54-40cd-bfc2-04bee5e7986d&width=2950&userId=038a9d8a-4e75-4deb-a374-ed6ff93980c6&cache=v2)

***

<br>

## Frameworks TOP 10

1. [Express](https://expressjs.com/)

   package와 동일하게 Framesworks에서도 1위를 차지했다.

2. [Koa](https://koajs.com/)

   Express.js 개발팀이 만든 새로운 Framework라고 한다.

   > When you are looking for the high performance web applications, then Koa is exactly what you need for the development.

   위와 같이 설명되어 있는데 써보지 않아서 잘 모르겠다.

3. [Hapi](https://hapi.dev/)

   월마트랩에서 개발하고 있는 엔터프라이즈급 서버를 대응하기 위한 Framework라고 한다.   
   위 2개의 Framewokr와 함께 **Node.js 3대 Server Framework**라고 불리지만, 설정이 복잡하여 의견이 많다고 한다.

4. [Meteor](https://www.meteor.com/)

   모바일 친화적인 Framework같은데 사용해보지 않아서 잘 모르겠다.

5. [Socket.io](https://socket.io/)

6. [Sails](https://sailsjs.com/)

   Express가 **built-on**된 MVC기반 프레임워크이다.

7. [LoopBack.io](https://loopback.io/)

   > A highly extensible Node.js and TypeScript framework for building APIs and microservices.

   위와 같이 설명되는 Framework이다. 처음들어본다...
   `Typescript`라는 키워드가 눈에 띄는데 확인 한번 해보면 좋겟다.

8. [Nest](https://nestjs.com/)

   Angular기반의 Server Framework이다.
   내가 제일 애용하고 있는 Framework이며, 초창기에는 자료도 별로없고 불안정한 모습이였지만 해가 지날수록 다양한 기능과 안정성을 제공하고 있다.
   내가 느끼는 단점은 간단한 서버에 있어서는 다소 무서운 Framework라고 느껴진다.

9. [Total](https://www.totaljs.com/)

   잘 모르겠다...

10. [Adonis](https://adonisjs.com/)
  
   이것도 잘 모르겠다...

![](https://miro.medium.com/max/1280/0*54Xt5NaUm_Y3oEBo)

***

<br>

## Summary

Package의 경우엔 내가 사용하고 있거나 했었던 모듈들이 상당히 많이 있었다.
아무래도 많이 사용하는 만큼 안정된 기능을 제공할 것이라는 기대감 때문이 아닐까?

Framework의 경우엔 한가지를 정하면 왠만해서는 변경하는 일이 없어서인지
2개를 제외하곤 제대로 사용해보지 못했던 Framework들이었다.
여유가 될 때 기본적인 것들을 한번 구현해보는 것도 좋은 방법일 것 같다.

***

<br>

## Reference

<span class="reference">

[Top 10 NPM Packages for Node.js Developers 2020](https://medium.com/javascript-in-plain-english/top-10-npm-packages-for-node-js-developers-2020-a6ff29101ccd)

[Top 10 Node.js Frameworks For Web App Development in 2020-21](https://medium.com/javascript-in-plain-english/top-10-node-js-frameworks-for-web-app-development-in-2020-21-38e3ea2a57e5)

[Express, Koa, Hapi 장단점 비교](https://edykim.com/ko/post/express-koa-hapi-pros-and-cons-comparison/)

</span>
