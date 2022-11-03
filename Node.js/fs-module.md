# module

모듈이란 `어플리케이션을 구성하는 개별적 요소`를 말한다.

-   파일단위로 분리되며 존재하다가 어플리케이션의 로드에의해 일원이 된다.

# npm

> Node.js에서 사용할 수 있는 모듈들을 `패키지화` 하여 모아둔 집합 저장소

# fs module

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
