# 딕셔너리
key-value 형태로 다양한 자료형 객체를 저장하는 자료구조(Map과 유사함)

## 구현 메서드
- 전체 객체 획득 / 초기화 / 크기반환
    - Dictionary.getBuffer(), Dictionary.clear(), Dictionary.size()
- 객체 추가 / 삭제 / 반환 / 존재여부
    - Dictionary.set(), Dictionary.remove(), Dictionary.get(), Dictionary.has()
- key, value 배열로 반환 / 고차함수
    - Dictionary.keys(), Dictionary.values(), Dictionary.each()

## Dictionary
생성자 함수
- 배열에서는 slice를 사용했으나 기본 Object에는 사용이 불가 하기 때문에 전개연산자를 통해 반환 해 준다.
```javascript
function Dictionary(items = {}){
    this.items = items;
};
```
## getBuffer
모든 객체 반환
```javascript
Dictionary.prototype.getBuffer = function(){
    return {...this.items};
};
```
## clear
초기화
```javascript
Dictionary.prototype.clear = function(){
    return this.items = {};
};
```
## size
크기 반환
- Object.keys()를 사용하면 Key값을 받아 배열로 반환해 준다.
```javascript
Dictionary.prototype.size = function(){
    return Object.keys(this.items).length;
};
```
---
## has
객체 존재 여부 확인
- hasOwnProperty() 메소드는 객체가 특정 프로퍼티를 가지고 있는지를  나타내는 불리언 값을 반환한다.
- 모든 객체는 hasOwnProperty 를 상속하는 Object의 자식이다.
```javascript
Dictionary.prototype.has = function(key){
    return this.items.hasOwnProperty(key);
};
```
---
## set
객체 추가
```javascript
Dictionary.prototype.set = function(key, value){
    return this.items[key] = value;
};
```
---
## get
객체의 value반환
```javascript
Dictionary.prototype.get = function(key){
    return this.has(key) ? this.items[key] : undefined;
};
```
---
## remove
객체 삭제
```javascript
Dictionary.prototype.remove = function(key){
    if(this.has(key)){
        delete this.items[key];
        return true;
    }
    return false;
};
```
---