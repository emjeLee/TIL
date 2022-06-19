# Typescript 란?
Javascript는 유연한 언어이기 때문에 오류가 날 법한 코드를 작성해도 넘어가거나, 실행 하고 나서야 오류를 보여준다. 하지만, Typescript는 Javascript에 타입 즉 선언 할 때 **string, number, boolean,,,** 등 타입을 지정 해 주거나 알아서 유추해 주기 때문에 미연의 방지를 해 주는 방어막 역할이라고 할 수 있다.

### Javascript
```javascript
const a = 1;
const b = '1';
console.log(a+b); // 11
```
### Typescript
```javascript
const a: number = 1;
const b: string = '1';
console.log(a+b); // Error
```
위와 같은 경우 Javascript는 마음대로 계산을 해 주지만 의도하게 아니라면 이것으로 인해 버그가 발생 할 수 있는 것 이다.
반면에 Typescript는 타입을 선언해 실행 되기도 전에 오류 메세지를 띄워준다. 

# Type Checker와 소통하는 방법
1. ```lat a = 'hello'``` 자동으로 타입을 추론
2. ```lat b : boolean = true``` 명시적으로 타입을 지정

### Typescript
```javascript
let a = 'hello';
a = 'hi'; // OK
a = 1; // Error
```
이런식으로 선언을 해 주면 TypeScript에서 타입을 추론 해 준다 때문에 'a'의 타입은 ```string```이 되고 'a'에 >1<이 할당 되었을 때 ```string이 아닌 값```이 들어왔기 때문에 Typescript에서는 오류가 나는 것 이다. Javascript는 달리 이런 경우가 가능한데, 보통 변수를 생성하고 타입을 변경하지 않기 때문에 이런 방어가 좋은 것 이다.