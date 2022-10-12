# Object

-   `{}`이용하여 바로 `object`를 생성할 수 있다.
-   JS는 동적으로 타입이 `Runtime`때 결정되기 때문에 뒤늦게 `properties`를 추가/삭제할 수 있다.
    -   하지만 유지보수가 힘들고, 생각지못한 에러가 발생할 수 있다.
-   object는 `key`와 `value`의 집합체이다.
    -   key : 사용자가 접근할 수 있는 `property`
    -   value : property가 갖고있는 `값`

## Literals and properties

```javascript
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
    console.log(person.name);
    console.log(person.age);
}

const lmj = { name: "lmj", age: 4 };
print(lmj);

lmj.hasJob = true; // Runtime언어이기때문에 추가 가능
delete lmj.hasJob;
```

## Computed properties

-   점표기법 또는 괄호표기법 `[]`에 `string`타입으로도 받아올 수 있다.
    -   점 표기법 : 코딩하는 순간 해당하는 값을 받아오고 싶을 때
    -   괄호 표기법 : 정확하게 어떤 key가 필요한지 모를 때, 즉 런타임에서 결정될 때 사용
        사용자에게 input을 받아 사용할 때

```javascript
console.log(lmj.name);
console.log(lmj["name"]);

// 어떤 키 값을 받을지 함수를 호출할 때 결정된다.
function printValue(obj, key) {
    console.log(obj[key]);
}
printValue(lmj, "name");
printValue(lmj, "age");
```

## Constructor Function

-   순수하게 object만 생성하는 함수는 대문자로 시작하는 함수명을 갖는다.
-   호출도 class에서 object를 만드는 것처럼 `new`키워드를 사용한다.

```javascript
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = new Person("lmj", 30);
console.log(person4); // Person {name: "lmj", age:30}

function Person(name, age) {
    // this = {};
    this.name = name;
    this.age = age;
    // return this;
}
```

## in operator: property existence check (key in obj)

-   key의 존재여부 확인

```javascript
console.log("name" in ellie);
console.log("age" in ellie);
console.log("random" in ellie);
console.log(ellie.random); // undefined
```

## for..in vs for..of

-   for..in
    -   `lmj`가 갖고있는 key들이 블럭을 돌 때마다 `let key`라는 지역변수에 할당.
-   for..of
    -   배열에있는 모든 값들이 `let value`에 할당.

```javascript
// for (key in obj)
for (let key in lmj) {
    console.log(key);
}

// for (value of iterable)
const array = [1, 2, 4, 5];
for (let value of array) {
    console.log(value);
}
```

## cloning

-   `user2`는 user가 가르키는 값과 같은 값을 가르키고 있기 때문에 `user2`에서 변경한 값은 `user`에서도 변경된다.

```javascript
// Object.assign(dest, [obj1, obj2, obj3...])
const user = { name: "lmj", age: "20" };
const user2 = user;
user2.name = "coder";
console.log(user); // {name: "corder", age: "20"}
```

### old way

-   obj를 수동적으로 돌면서 값을 할당하는 방법.
-   `assign`은 앞에 동일한 `property`가 있다면 값을 덮어쓴다.

```javascript
const user3 = {};
for (let key in user) {
    user3[key] = user[key];
}

console.log(user3);

const user4 = Object.assign({}, user);
console.log(user4); // {name: "corder", age: "20"}

// another example
const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // blue
console.log(mixed.size); // big
```
