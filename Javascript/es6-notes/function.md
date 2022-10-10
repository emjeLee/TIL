# Function

-   여러번 재사용이 가능하다
-   한가지의 작업이나 값을 계산하기 위해 존재한다.

## Function declaration

    function name(param1, param2) { body... return; }

-   1개의 함수에는 1가지의 일만 하도록 만든다.
-   함수는 동사형태로 이름을 짓는다.
-   함수는 `object`이다.
    -   변수에 할당, 매개변수로전다, 반환등이 가능하다.

```javascript
function log(message) {
    console.log(message);
}
log("Hello@"); // Hello@
log(1234); // 1234 숫자 -> 문자로 변경되어 출력
```

## Parameters

-   기본형 매개변수
    -   메모리에 `value가 저장`되기 때문에 value가 전달된다.
-   object
    -   메모리에 `ref가 저장`되기 때문에 ref가 전달된다.
    -   함수안에서 object의 값을 변경하게되면 변경된 메모리값이 저장된다.

```javascript
function changeName(obj) {
    obj.name = "coder";
}
const lmj = { name: "lmj" };
changeName(lmj);
console.log(lmj); // {name: "coder"}
```
## Default parameters (added in ES6)
- 매개변수에 값을 전달해주지 않으면 undefined 가 출력되었지만 ES6에서부터는 매개변수에 `Default값을 설정`할 수 있다.
```javascript
function showMessage(message, from = 'unknown') {
  console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // Hi! by unknown
```
## Rest parameters (added in ES6)
- `...`을 사용하면 배열형태로 전달된다.
```javascript
function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
}
printAll('apple', 'cherry', 'banana'); 
// apple
// cherry
// banana
```
## Local scope
- 밖에서는 안이 보이지 않고 **안에서만 밖을 볼 수 있다.**
- 함수나 if안 블럭안에서 선언하면 그것은 `지역변수`이기 때문에 블럭안에서만 사용할 수 있다.
```javascript
let globalMessage = 'global'; // global variable

function printMessage() {
  let message = 'hello';
  console.log(message); // local variable
  console.log(globalMessage);
  function printAnother() {
    console.log(message);
    let childMessage = 'hello';
  }
  // console.log(childMessage); //error
}
printMessage();
```

## Return a value
- 매개변수로 값을 전달받아 계산된 값을 반환할 수 있다.
- 모든 함수에는 `return undefined(생략가능)`이거나 반환할 수 있다.
```javascript
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`);
```
## Early return, early exit
- 조건이 맞지않을 때는 빨리 `return`을하여 끝내버린다.
```javascript
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic...
  }
}

// good
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic...
}
```
# First-class function
- 변수에 할당이 된다.
- 매개변수로 전달된다.
- 반환값으로도 return가 된다.

## Function expression
함수의 선언과동시에 할당이 됨.
함수도 호이스팅이 존재한다.
- 기명함수 일 시.
### 익명함수
- 함수에 정의된 이름없이 필요한 로직을 작성해 변수에 할당.
```javascript
print(); // Error
const print = function () {
  // anonymous function
  console.log('print');
};
print(); // print
const printAgain = print;
printAgain(); // print
```
## Callback function using function expression
- 함수를 전달하여 상황에 맞게 불러쓸 수 있게 전달하는 것.
```javascript
function randomQuiz(answer, printYes, printNo) {
  if (answer === 'love you') {
    printYes();
  } else {
    printNo();
  }
}

// 익명함수
const printYes = function () {
  console.log('yes!');
};

// 기명함수
// 재귀를 사용할 때 기명함수를 씀
const printNo = function print() {
  console.log('no!');
};

randomQuiz('wrong', printYes, printNo); // no!
randomQuiz('love you', printYes, printNo); // yes!
```

## Arrow function
- 익명함수
- 한 줄인 경우 블럭없이 작성이 가능하지만, 다양한 로직이 필요하다면 블럭사용이 가능하나 `return`을 통해 값을 반환 해야한다.
```javascript
const simplePrint = () => console.log('simplePrint!');
const add = (a, b) => a + b;

const simpleMultiply = (a, b) => {
  // do something more
  return a * b;
};
```
## IIFE: Immediately Invoked Function Expression
- 함수의선언을 괄호로 묶고 선언하듯이 `()`로 호출해주면 선언함과 동시에 호출이 가능하다.
- 잘 쓰이지는 않는다.
```javascript
(function hello() {
  console.log('IIFE');
})();
```