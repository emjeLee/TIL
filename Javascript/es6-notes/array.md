# Array

## Declaration

```javascript
const arr1 = new Array();
const arr2 = [1, 2];
```

## Index position

```javascript
const fruits = ["apple", "banana"];
console.log(fruits); // ['apple', 'banana']
console.log(fruits.length); // 2
console.log(fruits[0]); // "apple"
console.log(fruits[1]); // banana
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // 배열의 마지막 요소
```

## Looping over an array

### forEach

    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any : void;

-   callback함수를 배열요소 하나하나에 전달하여 사용
    -   배열의 값이 전달되고 그 값의 index와 전체배열을 전달받는다.

```javascript
// print all fruits
// for
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for of
for (let fruit of fruits) {
    console.log(fruit);
}

// forEach
fruits.forEach((fruit) => console.log(fruit));
```

## Addtion, deletion, copy

-   `unshift`와 `shift`는 맨 앞의 요소가 추가되고 삭제하는것이기 때문에 배열의 움직임이 많이 소요된다.
    -   배열이 길면 길수록 더욱 느려진다.

### push

-   add an item to the end

```javascript
fruits.push("strawberry", "peach");
console.log(fruits); // ['apple', 'banana', 'strawberry', 'peach']
```

### pop

-   remove an item from the end
- 지워진요소가 반환된다.

```javascript
fruits.pop(); // "peach"
fruits.pop(); // "strawberry"
console.log(fruits); // ['apple', 'banana']
```

### unshift

-   add an item to the beginning

```javascript
fruits.unshift("lemon");
console.log(fruits); // ['lemon', 'apple', 'banana']
```

### shift

-   remove an item from the beginning

```javascript
fruits.shift();
console.log(fruits); // ['apple', 'banana']
```

### splice

-   remove an item by index position

`deleteCount`를 지정하지 않으면 시작지점부터 나머지 요소들이 전부 삭제된다.

    splice(start: number, deleteCount?: number): string[]

```javascript
fruits.push("strawberry", "lemon");
console.log(fruits); // ['apple', 'banana', 'strawberry', 'lemon']
fruits.splice(1, 1);
console.log(fruits); //['apple', 'strawberry', 'lemon']
fruits.splice(1, 1, "melon", "orange");
console.log(fruits); //['apple', 'melon','orange', 'lemon']
```

### concat

-   기존배열과 새배열을 하나로 합쳐서 반환한다.

```javascript
// combine two arrays
const fruits2 = ["🍐", "🥥"];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);
```

## Searching

### indexOf

-   find the index
-   배열에 요소가 없다면 `-1`반환

```javascript
console.log(fruits); //['apple', 'melon','orange', 'lemon']
console.log(fruits.indexOf("apple")); // 0
console.log(fruits.indexOf("orange")); // 2
console.log(fruits.indexOf("coconut")); // -1
```

### includes

-   배열요소의 여부를 true/false로 반환.

```javascript
console.log(fruits.includes("lemon")); // true
console.log(fruits.includes("coconut")); // false
```

### lastIndexOf

-   중복요소의 제일 뒤에있는 index를 반환
    - 배열에 요소가 없다면 `-1`반환
```javascript
fruits.push("apple");
console.log(fruits); //['apple', 'melon','orange', 'lemon', 'apple']
console.log(fruits.indexOf("apple")); // 0
console.log(fruits.lastIndexOf("apple")); // 4
console.log(fruits.lastIndexOf("coconut")); // -1
```
