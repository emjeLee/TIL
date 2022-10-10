# Variable

## var : 사용을 지양하자

대부분의 프로그래밍언어에서는 변수선언 후 값을 선언하는것이 정상적인데, var에서는 선언도 전에 값을 할당은 물론 출력하는것도 가능하다.

```javascript
// 변수는 정의되어 있지만 값이 할당되지 않음
console.log(age); // undefined
age = 4;
var age;
```

이렇게 값을 할당하기도 전에 사용하는것을 `var hoisting`이라고 한다.

## var hoisting

    어디에 선언했냐에 상관없이 선언을 항상 젤 위로 끌어올리는 것.

-   var는 블록스코프를 무시함

## ERROR!

```javascript
{
    age = 4;
    var age;
}
console.log(age); //4
```

---

## let : Mutable

-   변수를 선언할 수 있다.
-   선언된 변수는 메모리 어딘가에 할당된 박스를 가르킨다
    -   이것을 통해 값을 계속 바꿀 수 있음
-   ES6에서부터 추가되었다.

## const : Immutable

-   한번 할당히면 재 할당이 불가능하다
-   값을 할당한 후 값이 변경되지 않는 데이터타입을 지향하라.
    -   보안상의 이유.
    -   thread들이 동시에 값을 변경하는것을 상황을 줄일 수 있다.
    -   변경되어야 할 이유가 없다면 const를 사용하여 실수를 방지.

---

# Variable types

-   primitive, single item
-   object, box container
-   function, first-class function

# Number

JS에서는 정수, 실수 모두 `number`로 표현된다.

```javascript
const count = 17; // integer
const size = 17.1; // decimal number
console.log(`value: ${count}, type: ${typeof count}`); // value: 17, type: number
console.log(`value: ${size}, type: ${typeof size}`); // value: 17.1, type: number
```

## special numeric values

0과 숫자가 아닌값으로 나누었을 때

```javascript
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = "not a number" / 2;

console.log(infinity); // Infinity
console.log(negativeInfinity); // -Infinity
console.log(nAn); // NaN
```

---

# String

```javascript
const char = "c";
const brendan = "brendan";
const greeting = "hello " + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; //template literals (string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

console.log("value: " + helloBob + " type: " + typeof helloBob); // before template literals
```

---

# boolean

-   false
    -   0, null, undefined, NaN, ''
-   true
    -   any other value

```javascript
const canRead = true;
const test = 3 < 1; // false

// value: true, type: boolean
console.log(`value: ${canRead}, type: ${typeof canRead}`);
// value: false, type: boolean
console.log(`value: ${test}, type: ${typeof test}`);
```

---

# null

명시적으로 `빈 값`이라고 `값을 지정`해 준 것.

-   `null`이 할당 됨

```javascript
let nothing = null;

//value: null, type: object
console.log(`value: ${nothing}, type: ${typeof nothing}`);
```

# undefined

선언은 되었지만 값이 지정되어있지 않음

-   빈 값인지 아닌지 정해지지않은 상태

```javascript
let x;

//value: undefined, type: undefined
console.log(`value: ${x}, type: ${typeof x}`);
```

# symbol

고유한 식별자가 필요하거나, 동시다발적으로 일어나는 코드에서 우선순위를 주고싶을때 사용.

-   `symbol`은 동일한 string을 작성 했어도 다른 symbol로 만들어진다.

```javascript
const symbol1 = Symbol("id");
const symbol2 = Symbol("id");

console.log(symbol1 === symbol2); // false
```

-   동일한 string로 `동일한 symbol`을 생성하고 싶다면 `for`를 사용

```javascript
const gSymbol1 = Symbol.for("id");
const gSymbol2 = Symbol.for("id");

console.log(gSymbol1 === gSymbol2); // true
```
symbol을 출력할 땐 `.description`을 사용하여 string로 변환해야한다.
```javascript
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);
// value: id, type: symbol
```
# object
- `lmj`는 `const`로 선언되어 할당 된 object는 다른 object로 재할당이 불가능하다.
- 하지만 object안의 `name, age`가 갖고있는 포인트들의 값은 재 할당이 가능하다.
```javascript
const lmj = { name: 'lmj', age: 20 };
lmj.age = 21;
```