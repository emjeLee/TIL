# 딕셔너리
key-value 형태로 다양한 자료형 개체를 저장하는 자료구조(Map과 유사함)

## 구현 메서드
- 전체 개체 획득 / 초기화 / 크기반환
    - Dictionary.getBuffer(), Dictionary.clear(), Dictionary.size()
- 개채 추가 / 삭제 / 반환 / 존재여부
    - Dictionary.set(), Dictionary.remove(), Dictionary.get(), Dictionary.has()
- key, value 배열로 반환 / 고차함수
    - Dictionary.keys(), Dictionary.values(), Dictionary.each()

## Dictionary
- 배열에서는 slice를 사용했으나 기본 Object에는 사용이 불가 하기 때문에 전개연산자를 통해 반환 해 준다.
```javascript
function Dictionary(items = {}){
    this.items = items;
};
```
## getBuffer
```javascript
Dictionary.prototype.getBuffer = function(){
    return {...this.items};
};
```
## clear
```javascript
Dictionary.prototype.clear = function(){
    return this.items = {};
};
```
## size
- Object.keys()를 사용하면 Key값을 받아 배열로 반환해 준다.
```javascript
Dictionary.prototype.size = function(){
    return Object.keys(this.items).length;
};
```
---
