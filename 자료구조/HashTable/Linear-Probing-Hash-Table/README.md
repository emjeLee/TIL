# 선형 조사법 해시테이블
Hash 충돌이 발생했을 때, 그 **다음 주소**를 확인하고 **비어있다면** 그 자리에 대신 저장하는 해시테이블 기반 자료구조

# 구현 메서드
- 객체 초기화 / 크기반환
    - [LinearHashTable.clear()](#clear), [LinearHashTable.size()](#size)
- 전체 데이터 반환, 전체 데이터 출력
    - [LinearHashTable.getBuffer()](#getbuffer), [LinearHashTable.print()](#print)
- 데이터 추가 / 삭제 / 반환
    - LinearHashTable.put(), LinearHashTable.remove(), LinearHashTable.get()

## 생성자 함수 및 해시코드
```javascript
// Element() : key, value 저장을 위한 생성자 
function Element(key, value){
    this.key = key;
    this.value = value;
};

// LinearHashTable() : 생성자
function LinearHashTable(){
    this.table = new Array(HASH_SIZE);
    this.length = 0; //실제 데이터들이 몇 개 있는지 카운팅 
};

// hashCode() : 해시 함수
LinearHashTable.prototype.hashCode = function(key){
    let hash = 0;
    for (let i=0; i<key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash % HASH_SIZE;
};
```

## clear
```javascript
LinearHashTable.prototype.clear = function(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};
```
## size
```javascript
LinearHashTable.prototype.size = function(){
    return this.length;
};
```
## getBuffer
```javascript
LinearHashTable.prototype.getBuffer = function(){
    let array = [];
    for(let i=0; i<this.table.length; i++){
        if(this.table[i]){
            array.push(this.table[i]);
        }
    }
    return array;
};
```

## print
```javascript
LinearHashTable.prototype.print = function(){
    for(let i=0; i < this.table.length; i++){
        if(this.table[i]){
            console.log(`${i} -> ${this.table[i].key}: ${this.table[i].value}`)
        }
    }
};
```