# 배열  
-   여러 개체 값을 순차적으로 나열한 선형 자료 구조  
- 자바스크립트에서 배열은 다른 언어에서 말하는 일반적인 배열이 아닌 Hash 기반의 객체  

# 속성 및 메서드  

- 배열 크기 및 배열 여부 확인: length(), isArray()  
- 배열 추가/삭제 : push(), pop(), shift(), unshift(), splice(), slice()  
- 배열 탐색: indexOf(), lastIndexOf(), includes()  
- 배열 변형: sort(), resverse(), join()  
- 배열 반복: forEach(), map(), find(), filter(), reduce()  
- 논리 연산: some(), every()  

# 배열 반복문 

```javascript
let array = ['apple', 'banana', 'melon'];

for (let element of array){
    console.log(element); // apple, banana, melon
}

for(let key in array){
    console.log(array[key]); // apple, banana, melon
}
```