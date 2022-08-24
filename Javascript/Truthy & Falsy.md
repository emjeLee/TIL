## 참 같은 값, 거짓 같은 값
---
```javascript
let a = "";

if(a){
    console.log('true');
} else {
    console.log('false');
}
// result => false
```
'a'의 값이 빈값이기 때문에 'false'가 출력되지만  

    let a = 'a';
위와 같이 a에 값이 들어 간다면 'true'를 출력 한다. 자바스크립트의 조건식에는 'Boolean값'을 넣지않아도 아래와 같이 참이나 거짓으로 인식이 되는 특징이 있다.

    let a = []; // true
    let a = undefined; // false

True가 아닌데 '참'으로 분류되는 값을 **Truthy** False가 아닌데 '거짓'으로 분류되는 값을 **Falsy** 한다.
- Truthy
    -  {}, number, 'false'(문자열), infinity
- Falsy
    - null, 값을 할당하지 않은 상태(=undefined), 0, -0, NaN, ""(빈 문자열)

```javascript
const getName = (person) => {
    return person.name;
};

let person = {name: "lmj"};
const name = getName(person);
console.log(name); // lmj
```
```let person;``` 을 전달하면 **error** 발생 그 이유는 'undefined'에 점 표기법으로 접근하려 했기 때문. 'undefined'는 객체가 아니기 때문에 ```prototype```에 접근 할 수 없다. 따라서 조건문을 통해 전달 받은 매개변수가 객체인지 아닌지를 판단 할 수 있게 해 주어야 한다.
```javascript
const getName = (person) => {
    if(person === undefined){
        return "객체가 아닙니다."
    }
    return person.name;
};

let person;
const name = getName(person);
console.log(name); // 객체가 아닙니다.
```
하지만 ```let person = null;```값이 들어 오게 된다면 'undefined'의 예외 처리 밖에 못 하기 때문에 또 오류가 난다. 따라서 이럴 때 Falsy속성을 이용하여 쉽게 처리 할 수 있다.
```javascript
const getName = (person) => {
    if(!person){
        return "객체가 아닙니다."
    }
    return person.name;
};

let person;
const name = getName(person);
console.log(name); // 객체가 아닙니다.
```
따라서 'false' + 'Not' => True 가 된다.