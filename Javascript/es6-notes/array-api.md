# Array Api

## join

make a string out of an array

    join(separator?: string) : string;

-   `separator`라는 구분자를 문자열을 선택적으로 받는다.

```javascript
const fruits = ["apple", "banana", "orange"];
const result = fruits.join(",");
console.log(result); // apple, banana, orange
```

## split

make an array out of a string

    split(separator: string | TegExp, limit?: number): string[];

-   `string`을 여러개의 문자열로 나누어주는데 `separator`를 구분자로 사용하여 배열로 반환.
-   반환받을 배열의 크기를 지정할 수 있다.

```javascript
const fruits = "apple, banana, orange";
const result = fruits.split(",");
console.log(result); // [apple, banana, orange]
```

## reverse

배열의 순서 뒤집기

-   원본배열의 순서도 변경된다.

```javascript
const array = [1, 2, 3, 4, 5];
const result = array.reverse();
console.log(result); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1]
```

## slice

make new array without the first two elements

    slice(start?: number, end?: number): T[]

-   `end`로 전달되는 값은 `exclusive`한 값이기 때문에 포함되지않는다.
-   배열의 특정부분만을 반환

        splice()는 배열자체를 수정한다.

```javascript
const array = [1, 2, 3, 4, 5];
const result = array.slice(2, 5);
console.log(result); // [3, 4, 5]
console.log(array); // [1, 2, 3, 4, 5]
```

---
### find, map, some, reduce
```javascript
class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student("A", 29, true, 45),
    new Student("B", 28, false, 80),
    new Student("C", 30, true, 90),
    new Student("D", 40, false, 66),
    new Student("E", 18, true, 88),
];
```

## find

    find(predicate: (this: void, value: T, index: number, obj: T[])
    => value is S. thisArg?)

-   callback함수를 받는다.
-   배열안에서 찾는 값의 `첫 번째` 값을 반환한다.
    -   배열의 모든 요소에 callback함수가 호출된다.
    -   callback 함수가 `true`를 반환하면 함수를 종료하고 그 요소를 반환한다.

```javascript
const result = students.find((student) => student.score === 90);
console.log(result);
// Student {name: "C", age: 30, enrolled: true, score: 90}
```

## filter

    filter(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]

-   callbackfn을 전달하여 반환값이 `true`인 값을 모아 배열로 반환 한다.

```javascript
const result = students.filter((student) => student.enrolled);
console.log(result);
// Student {name: "A", age: 29, enrolled: true, score: 45}
// Student {name: "C", age: 30, enrolled: true, score: 90}
// Student {name: "E", age: 18, enrolled: true, score: 88}
```

## map

-   각각의 요소들이 `callbackfn`에 따라 가공된 값의 배열로 반환한다.

```javascript
const result = students.map((student) => student.score);
console.log(result); // [45, 80, 90, 66, 88]
```

## some

    some(callbackfn: (value: T, index: number, array: T[] => unknown, thisArg?: any): boolean

-   배열의 요소들중 하나라도 조건에 만족되는 요소가 있다면 `true`를 반환한다.

```javascript
// 하나라도 충족되면 true
const result = students.some((student) => student.score < 50);
console.log(result); // true

// 모두 충족되면 true
const result2 = !students.every((student) => student.score < 50);
console.log(result2); // false
```

## reduce

    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex, number, array: T[])=> T): T;

-   배열의 모든 요소를 호출하는데 callbackfn에서 반환되는 값은 누적된 결과값을 반환한다.
    -   배열의 요소들을 누적, 모아둘 때 사용
    -   초기값을 지정할 수 있다.
-   prev : 직전 callback에서 반환받은 값
-   curr : 하나씩 전달되는 배열 요소

```javascript
const result = students.reduce((prev, curr) => prev + curr.score, 0);
console.log(result / students.length); // 73.8
```
