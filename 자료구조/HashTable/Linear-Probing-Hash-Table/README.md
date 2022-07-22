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
## put
데이터 추가
-  해당인덱스에 값이 존재 하는지 확인
    - 비어있다면 그 자리에 값을 넣는다
    - 비어있지 않다면 다음 인덱스를 확인 후 비어 있으면 값을 넣는다 (시작 인덱스로 다시 돌아올때까지 반복)
- startIndex에 처음 인덱스 값을 저장해준다.
- 처음 index값과 startIndex의 값이 같기 때문에 바로 종료 되지 않도록 do while을 사용해준다.
```javascript
LinearHashTable.prototype.put = function(key, value){
    let index = this.hashCode(key);
    let startIndex = index;
    console.log(`key: ${key} -> index: ${index}`);

    do{
        //비어 있을 때
        if(this.table[index] === undefined){
            this.table[index] = new Element(key, value);
            this.length++;
            return true;
        }
        // 비어있지 않을 때
        index = (index + 1) % HASH_SIZE;
    }   
    while (index !== startIndex);
    return false;
};
```