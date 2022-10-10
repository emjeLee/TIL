# Operator
## String concatenation
- `+`를 사용하여 문자와 문자를 연결할 수 있다.
- 문자열에 숫자를 더하게되면 문자가 숫자로 변경되어 연산된다.
```javascript
console.log('my' + ' cat'); // my cat
console.log('1' + 2); // 12
console.log(`string literals: 1 + 2 = ${1 + 2}`); // string literals: 1 + 2 = 3
```

## Numeric operators
```javascript
console.log(1 + 1); // 2
console.log(1 - 1); // 0
console.log(1 / 1); // 1
console.log(1 * 1); // 1
console.log(5 % 2); // 1 나머지
console.log(2 ** 3); // 8 제곱
```

## Increment and decrement operators
- counter에 +1을 먼저 할당한 다음 변수에 할당한다.
```javascript
let counter = 2;
const preIncrement = ++counter;

// preIncrement: 3, counter: 3
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
```
- 변수의 값을 먼저 1증가 시킨 후 변수에 값을 할당한다.
```javascript
const postIncrement = counter++;

// postIncrement: 3, counter: 4
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`);
```
## Assignment operators
```javascript
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y; // x = x - y;
x *= y; // x = x * y;
x /= y; // x = x / y;
```
## Comparison operators
```javascript
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal
```
## Logical operators: || (or), && (and), ! (not)
- `or`은 `true를 만나면 바로 종료`하기 때문에 연산을 많이 필요로하는 무거운 조건들을 맨 앞에 두면 안 된다. 심플한 요소들부터 체크하는것이 좋다.

- `and`또한 `false를 만나면 종료`하기 때문에 심플한 연산부터 체크하는것이 좋다.
```javascript
const value1 = true;
const value2 = 4 < 2;

// || (or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`);

// && (and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`);

function check() {
  for (let i = 0; i < 10; i++) {
    //wasting time
    console.log('😱');
  }
  return true;
}

// ! (not)
console.log(!value1); // false
```
- and는 null체크 할때도 많이 사용된다.
- `nullableObject`에 값이 있는지 먼저 체크 후 실행.
```javascript
//often used to compress long if-statement
// nullableObject && nullableObject.something
if (nullableObject !== null){
    nullableObject.something;
}
```
## Equality
```javascript
const stringFive = '5';
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive); // T
console.log(stringFive != numberFive); // F

// === strict equality, no type conversion
console.log(stringFive === numberFive); // F
console.log(stringFive !== numberFive); // T
```
- imj1, 2는 똑같은 데이터가 들어있지만 메모리에는 각각 다른 ref가 들어있으며 서로다른 obj를 가르키고있다.
- imj3은 imj1의 ref를 할당되어있으니 똑같은 ref를 갖고있다.
```javascript
// object equality by reference
const lmj1 = { name: 'lmj' };
const lmj2 = { name: 'lmj' };
const lmj3 = lmj1;
```
- ref가 다르다

        console.log(lmj1 == lmj2); // F
- type에 상관없이 ref가 다른 ref를 갖고있음.
        
        console.log(lmj1 === lmj2); // F
- imj1의 값을 imj3에 `할당`한 것이기 때문에 같은 ref를 갖고있다.

        console.log(lmj1 === lmj3); // T

```javascript
console.log(0 == false); // T
console.log(0 === false); // F (boolean이 아님)
console.log('' == false); // T 
console.log('' === false); // F (boolean이 아님)
console.log(null == undefined); // T
console.log(null === undefined); // F (같은것으로 간주되나 type가 다름)
```

## Conditional operators: if
```javascript
// if, else if, else
const name = 'df';
if (name === 'lmj') {
  console.log('Welcome, Ellie!');
} else if (name === 'coder') {
  console.log('You are amazing coder');
} else {
  console.log('unkwnon');
} 
// unkwnon
```
## Ternary operator: ?
- 조건의 값이 참이면 1번째 값인 'yes'를 거짓이라면 2번째 값인 'no'를 출력한다.
```javascript
// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes' : 'no');
```
## Switch statement
- 다중 if검사에 사용
- 결과값이 같을 경우 case를 연달아 사용
- TS에서 타입을 검사할 때 가독성에 좋음
```javascript
const browser = 'IE';
switch (browser) {
  case 'IE':
    console.log('go away!');
    break;
  case 'Chrome':
  case 'Firefox':
    console.log('love you!');
    break;
  default:
    console.log('same all!');
    break;
} // go away!
```
## Loops 
### while
- 조건이 참인동안 계속 반복하여 실행한다.
```javascript
let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}
// while : 3
// while : 2
// while : 1
```
### do while
- 무조건 블록에 있는 명령문을 실행한 뒤 while 실행
    - 출력이 되고 난 후 i가 0이되어 반복문 종료
```javascript
do {
  console.log(`do while: ${i}`);
  i--;
} while (i > 0);
// do while : 0
```
## for loop, for(begin; condition; step)
- `condition`이 맞지않을 때 까지 `step`을 실행하며 반복한다.
```javascript
for (let i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
} 
// for : 3
// for : 2
// for : 1
```