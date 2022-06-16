// 배열 선언
let test1 = new Array(5);  // [ <5 empty items> ]
let test2 = []; // []

// 배열 접근
let fruits = ['apple', 'banana', 'orange'];

console.log(fruits); // ['apple', 'banana', 'orange']
console.log(fruits.length); // 3
console.log(fruits[0]); // apple

// Array[index] 를 통해 index 접근 : O(1)
fruits[3] = 'pear';
console.log(fruits) // ['apple', 'banana', 'orange', 'pear']
fruits[fruits.length - 1] = 'melon'
console.log(fruits); // ['apple', 'banana', 'orange', 'melon']

let nums = [];

nums['one'] = '1'; // 배열에 객체값을 넣을 수 있다.
console.log(nums.length); //2
console.log(nums); //[ 1, 2, one: '1' ]

// 베열 타입 확인
let num = 123;
let str = "Hello"
let array = ['apple', 'banana'];

console.log(Array.isArray(num)); // false
console.log(Array.isArray(str)); // false
console.log(Array.isArray(array)); // true

// 배열 추가/삭제 LIFO - Last In First Out (Back)
let fruits = ['apple', 'banana', 'orange'];
// 추가
fru = fruits.push('pear');
console.log(fruits); // [ 'apple', 'banana', 'orange', 'pear' ]
console.log(fru) // 4
//삭제
fru = fruits.pop();
console.log(fruits); //[ 'apple', 'banana', 'orange' ]
console.log(fru); // pear

// 배열 추가/삭제 LIFO - Last In First Out (Front)
let fruits = ['apple', 'banana', 'orange'];
//추가
fru = fruits.unshift('melon');
console.log(fruits) // [ 'melon', 'apple', 'banana', 'orange' ]
console.log(fru); //4
// 삭제
fru = fruits.shift();
console.log(fruits); // ['apple'. 'banana', 'orange' ]
console.log(fru); // melon

// Array.splice(index[, deleteCount, elem1, ..., elemN]) 추가/삭제
let test = [1,2,3,4,5,6,7];

console.log(test.splice(1)); // [ 2, 3, 4, 5, 6, 7 ]
console.log(test); // [1]

let test = [1,2,3,4,5,6,7];

console.log(test.splice(1,1)); // [2]
console.log(test) // [ 1, 3, 4, 5, 6, 7 ]
console.log(test.splice(1,1, 100, 200)); // [3]
console.log(test); // [ 1, 100, 200, 4, 5, 6, 7 ] 

// Array.slice([start],[end]) 원본배열 영향 X
let test = [1, 2, 3];

console.log(test.slice(1)); // [ 2, 3 ]
console.log(test) // [ 1, 2, 3 ]
console.log(test.slice(1,2)); // [2]

// 배열 탐색

let fruits = ['apple', 'banana', 'orange', 'melon', 'apple'];

// indexOf 시작위치 : 앞
console.log(fruits.indexOf('apple')); // 0
console.log(fruits.indexOf('Apple')); // -1
console.log(fruits.indexOf('apple', 2)); // 4

// lastIndexOf 시작위치 : 끝
console.log(fruits.lastIndexOf('apple')) //4
console.log(fruits.lastIndexOf('apple', -2)) // 0
console.log(fruits.lastIndexOf('banana', 0)) // -1

// includes 포함여부
console.log(fruits.includes('banana')) // true
console.log(fruits.includes('Banana')) // false

// 배열 -> 문자열
let fruits = ['apple', 'banana', 'orange', 'melon'];

console.log(fruits.join()); //apple,banana,orange,melon
console.log(fruits.join(';')); //apple;banana;orange;melon

