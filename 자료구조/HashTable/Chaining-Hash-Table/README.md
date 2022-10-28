# 체이닝 해시테이블
별도의 자료로주오 연결리스트를 병합 사용하여 Hash 충동를 해결한 해시테이블 기반 자료구조

## 구현 메서드
- 객체 초기화 / 크기 반환
    - ChainingHAshTable.clear(), ChainingHAshTable.size()
- 전체 데이터 반환 / 출력
    - ChainingHAshTable.getBuffer(), ChainingHAshTable.print()
- 추가 / 삭제 / 반환
    - ChainingHAshTable.put(), ChainingHAshTable.remove(), ChainingHAshTable.get()
---
## 생성자 함수
```javascript
const HASH_SIZE = 37;

// key, value 저장을 위한 생성자
function Element(key, value){
    this.key = key;
    this.value = value;
};

// 생성자 함수
function ChainingHashTable(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};

//해시함수
ChainingHashTable.prototype.hashCode = function(key){
    let hash = 0; 
    for (let i = 0; i < key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash % HASH_SIZE;
};
```
---
## clear
초기화
```javascript
ChainingHashTable.prototype.clear = function(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};
```

## size
크기 반환
```javascript
ChainingHashTable.prototype.size = function(){
    return this.length;
};
```
---
## getBuffer
데이터 셋 반환
- 데이터를 담을 빈 배열을 선언.
- for문을 사용해 배열 전체를 탐색한다.
- 테이블에 값이있다면(LinkedList가 존재 한다는 뜻) 해당 객체의 head값을 current에 할당한다.
- (null을 만날 때 까지)current의 값을 배열에 push 해 준 뒤, 다음값을 current에 업데이트 해준다.

```javascript
ChainingHashTable.prototype.getBuffer = function(){
    let array =[];
    for (let i = 0; i < this.table.length; i++){
        if(this.table[i]){
            let current = this.table[i].head;
            do {
                array.push(current.data);
                current = current.next;
            } while(current);
        }
    }
    return array;
};
```
## print
데이터 셋 출력
- getBuffer과 탐색하는 법은 같고, 출력 형식이 다르다.
- 해당 인덱스에 있는 객체들을 한줄로 출력 후 개행을 통해 분리 해 줌.
```javascript
ChainingHashTable.prototype.print = function(){
    for(let i = 0; i < this.table.length; i++){
        if(this.table[i]){
            let current = this.table[i].head;
            process.stdout.write(`#${i}`);
            do {
                process.stdout.write( `-> ${current.data.key}: ${current.data.value}`);
                current = current.next;
            } while(current);
            console.log("");
        }
    }
};
```
---
## put 
데이터 추가
- 배열 내 index에 값의 존재여부를 먼저 확인한다.
- 값이 없다면 LinkedList를 만들어준 후 append를 통해 값을 넣어준다.
- 값이 있다면 LinkedList의 append를 통해 뒤쪽에 붙여준다.
```javascript
ChainingHashTable.prototype.put = function(key, value){
    let index = this.hashCode(key);
    // 어떤 키 값을 갖는지 확인을 하기위한 용도
    console.log(`key: ${key} -> index: ${index}`);
    if(this.table[index] === undefined){
        this.table[index] =  new LinkedList();
    }

    this.table[index].append(new Element(key, value));
    this.length++;

    return true;
};
```
## get
데이터 조회
- 해시함수를 통해 인덱스에 접근 후 해당 인덱스가 비어 있는지 체크한다.
- 값이 있다면 current의 next를 통해 내가 찾으려는 key값과 같은지 비교한다.
- 값을 찾으면 해당 key의 value를 반환해주고 null을 만났다면 undefined를 반환한다.
```javascript
ChainingHashTable.prototype.get = function(key){
    let index = this.hashCode(key);

    if(this.table[index] !== undefined && !this.table[index].isEmpty()){
        let current = this.table[index].head;
        do {
            if(current.data.key === key){
                return current.data.value;
            }
            current = current.next;
        } while(current);
    }
    return undefined;
};
```
## remove
데이터 삭제
- get과 같이 존재여부를 확인하여 LinkedList의 remove를 통해 삭제 해 준다.
    - 한 가지 다른 점은 isEmpty를 통해 해당 인덱스에 Element가 존재하는지를 확인하여 더이상 데이터가 없다면 LinkedList를 삭제 해 준다.
```javascript
ChainingHashTable.prototype.remove = function(key){
    let index = this.hashCode(key);
    let element = undefined;

    if(this.table[index] !== undefined){
        let current = this.table[index].head;

        do {
            if(current.data.key === key){
                element = current.data;
                this.table[index].remove(current.data);
                this.length--;
                if(this.table[index].isEmpty()){
                    delete this.table[index];
                }
            }
            current = current.next;
        } while(current);
    } 
    return element;
};
```