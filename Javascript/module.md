# module

자바스크립트에서는 모듈이라는 개념이 존재하지 않지만 호스트 환경(Node.js등 자바스크립트가 구동되는 환경)에 따라 로직을 파일을 분할하여 다른언어에서의 모듈처럼 사용할 수 있는 환경을 제공하고 있다.

## 모듈이란?

모듈이란 `어플리케이션을 구성하는 개별적 요소`를 말한다.

-   파일단위로 분리되며 존재하다가 어플리케이션의 로드에의해 일원이 된다.
-   자주 사용되는 코드를 별도의 파일로 만들어 필요할 때마다 재활용할 수 있다.
-   모듈화된 파일을 개선하면 이를 사용하는 모든 애플리케이션의 동작이 개선된다.
-   코드 수정 시 필요한 로직을 빠르게 찾을 수 있다.
-   필요한 로직만 로드해 메모리의 낭비를 줄일 수 있다.
-   한번 다운로드된 모듈은 웹브라우저에 의해서 저장되기 때문에 동일한 로직을 로드 할 때 시간과 네트워크 트래픽을 절약 할 수 있다.(브라우저에서만)
---
# Node.js
## npm

> Node.js에서 사용할 수 있는 모듈들을 `패키지화` 하여 모아둔 집합 저장소

## fs module

fs module은 `비동기`와 `동기` API를 둘 다 제공하고 있다.

-   `fs module`은 Node.js에 내장되어 있어 별도의 설치없이 사용 가능하다.
-   `require` : CommonJs모듈 시스템을 사용하는 프로젝트에서 사용
-   `import` : ES모듈 시스템을 사용하는 프로젝트에서 사용

### 파일 최상단에 선언

> Node.js는 기본적으로 CommonJS방식을 따른다.

```javascript
// CommonJs Module
const fs = require("fs");

// ES Modules
import fs from "fs";
```

---

## readFile (읽기)

### 비동기적

```javascript
fs.readFile(filename, [options], callback);
```

> 파일을 `options` 방식으로 읽은 뒤, callback `함수를 호출`한다.

### 동기적

```javascript
fs.readFileSync(filename, [options]);
```

> 파일을 `options` 방식으로 읽은 뒤, `문자열`을 반환한다.

## writeFile (쓰기)

### 비동기적

```javascript
fs.writeFile(filename, data, [options], callback);
```

> 파일에 `options`방식으로 data의 내용을 쓰고 callback `함수를 호출`한다.

```javascript
fs.writeFileSync(filename, data, [options]);
```

> 파일에 `options`방식으로 data내용을 쓴다.
---
# 라이브러리
라이브러리는 모듈과 비슷한 개념이며 자주 사용되는 로직을 재사용하기 편리하도록 정리한 `일련의 코드들의 집합`을 의미한다.
- 목표를 선정해놓은 로직들의 집합
    - 서버와 쉽게 통신, 웹페이지를 쉽게 제어 등의 목적
