---
category: "인프라"
sub_category: "AWS"
series_name: ""
series_num: 0
title: "파일에 접근제한 부여하기 - Presigned URL"
url: "about-presigned-url"
description: "Presigned-URL을 사용하여 한된 시간동안 접근권한을 부여하는 한다."
tags: ["AWS", "S3", "CDN"]
date: 2020-09-16
update_date: 2020-09-16
---

**S3**의 접근권한이 `Public`일 경우 버킷과 파일주소만 안다면 업로드된 파일을 자유롭게 접근가능하다.
  
이를 통해서 S3에 이미지 리소스를 저장한다거나 업로드되는 파일을 저장하는 방법으로 사용하고 있다.
 
이런 편의성은 큰 장점이지만 보안관점에서 본다면 **큰 위험요소**가 될 수 있다

<br>

**AWS S3**에서는 이런 위험요소를 보안하기 위해서 **미리 서명된 URL**(`Presigned-URL`)이라는 기능을 제공한다. 

이 기능은 제한된 시간동안 접근권한을 부여하는 기능이다. 

이를 이용하면 특정 대상에게 제한된 시간동안 **S3**의 접근권한을 부여하여 조금이나마 위험부담을 줄일 수 있다.

***

## Presigned-URL

 **AWS**의 기본적인 세팅(`IAM`, `S3`)은 완료되어 있어야 한다. 그리고 `aws-sdk`패키지를 이용해서 URL을 만든다.

### 1. AWS-SDK 세팅하기

```bash
$ npm i aws-sdk
```

설치가 끝나면 `aws-sdk`초기화를 한다.

```javascript
const AWS = require('aws-sdk')

const accessKeyId = '######'
const secretAccessKey = '######'

AWS.config.update({accessKeyId, secretAccessKey})
```

기본적인 `aws-sdk`세팅이 끝나면 S3객체를 만든다.

```javascript
const s3 = new AWS.S3({signatureVersion: 'v4', region: 'Region'})
```

`signatureVersion`: api의 버전. 버전별로 만들어지는 URL의 형태와 암호화로직이 다르다. ('v2', 'v3', 'v4')

`region`: 엑세스 요청을 보낼 리젼. 이 리젼에 따라서 **endPoint**의 URL도 변경된다.

> **Note**: The default signer allows altering the request by adding corresponding headers to set some parameters (e.g. Range) and these added parameters won't be signed. You must use **signatureVersion v4** to to include these parameters in the signed portion of the URL and enforce exact matching between headers and signed params in the URL.

### 2. URL 생성하기

기본적인 **S3접근** 세팅이 완료되면 간단한 코드로 `presigned-URL`을 생성할 수 있다.

```javascript
const myBucket = 'BucketName'
const fileName = 'FileName'

const url = s3.getSignedUrl('getObject', {
    Bucket: myBucket,
    Key: fileName,
    Expires: 30 // 이 옵션에 따라서 URL, Presigned-URL로 구분된다.
})
```

`Expires` (default: 900s): 이 옵션을 추가해 주어야 `presigned-URL`이 생성된다.

```
# v4
https://{Bucket}.s3.{region}.amazonaws.com/{FileName}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential={KEY}%2F{region}%2Fs3%2Faws4_request&X-Amz-Date=20190718T234545Z&X-Amz-Expires=30&X-Amz-Signature=d7f47df5514f17f725e2e5213ff58487dbc61122e9851feea43898587a38c5d1&X-Amz-SignedHeaders=host

# v2
https://{Bucket}.s3.{region}.amazonaws.com/{FileName}?AWSAccessKeyId={KEY}&Expires=1563493619&Signature=OVRmBgNvivu8YNOUXNn9x6Wf%2BKE%3D
```

위와 같은 URL이 생성되면 앞서 설정한 Expire시간 동안 **Access Permission**이 부여된다.
 
만약 해당 허용시간이 초과된다면 아래와 같은 화면이 출력되며 이는 **Cloudfront**에서 변경가능하다

![](./img/presigned-url.png)

<span class="callout">
S3에 저장된 파일에 접근권한이 무엇이든 (Public, Private) 상관없지만, 사용의도에 맞게 **Private**으로 변경하는 것이 좋다.
</span>

***

## Reference

<span class="reference">

[AWS API 호출하기 (2) - Amazon S3 객체에 대한 미리 선언된(pre-signed) URL 생성하기](https://aws.amazon.com/ko/blogs/korea/aws-api-call-2-s3-pre-signed-url/)

[Class: AWS.S3 - AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

[Nodejs AWS SDK S3 Generate Presigned URL](https://stackoverflow.com/questions/38831829/nodejs-aws-sdk-s3-generate-presigned-url)

[S3 pre-signed url (미리 서명된 url) 만들기 - Medium](https://medium.com/@labcloud/s3-pre-signed-url-%EB%AF%B8%EB%A6%AC-%EC%84%9C%EB%AA%85%EB%90%9C-url-%EB%A7%8C%EB%93%A4%EA%B8%B0-596aff8bdc45)

</span>
