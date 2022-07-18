# 이중 연결 리스트
각 노드가 데이터와 포인터를 가지며, 두 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료구조
- 양쪽으로 연결되어 있기 때문에 노드를 탐색할 때 용이함.
- 하지만 이전노드를 저장할 변수를 하나 더 생성해야 하기 때문에 메모리를 더 많이 사용한다.
# 구현 메서드
- 노드 개수 / 값의 존재 여부
    - [DoubleLinkedList.size()](#size), [DoubleLinkedList.isEmpty()](#isempty)
- 순 차출력 / 역 출력
    - [DoubleLinkedList.printNode()](#printnode), [DoubleLinkedList.printNodeInverse()](#printnodeinverse)
- 노드 추가
    - [DoubleLinkedList.append()](#append), [DoubleLinkedList.insert()](#insert)
- 노드 삭제
    -  [DoubleLinkedList.remove()](#remove), [DoubleLinkedList.removeAt()](#removeat)
- 데이터 위치 확인
    - [DoubleLinkedList.indexOf()](#indexof)

## 객체 생성
- 양쪽으로 연결 해 주기 위한 prev가 추가 됨
```javascript
function Node(data){
    this.data = data;
    this.next = null;
    this.prev = null;
};
```
## DoubleLinkedList 생성자 함수 생성
```javascript
function DoubleLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;
};
```
## size
- this.length로 객체의 length를 반환
```javascript
DoubleLinkedList.prototype.size = function(){
    return this.length;
};
```

## isEmpty
- 노드의 존재 여부 확인
```javascript
DoubleLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};
```
## TEST
```javascript
let doubleLinkedList = DoubleLinkedList();
let node;
console.log(doubleLinkedList);
 // DoubleLinkedList { head: null, tail: null, length: 0 }

node = new Node(123);
doubleLinkedList.head = node;
doubleLinkedList.tail = node;
doubleLinkedList.length++;
console.log(doubleLinkedList);
 /* DoubleLinkedList {
    head: Node { data: 123, next: null, prev: null },
    tail: Node { data: 123, next: null, prev: null },
    length: 1 } */

node = new Node(456);
doubleLinkedList.tail.next = node;
node.prev = doubleLinkedList.tail;
doubleLinkedList.tail = node;
doubleLinkedList.length++;
console.log(doubleLinkedList);
/* DoubleLinkedList {
    head: <ref *1> Node {
        data: 123,
        next: Node { data: 456, next: null, prev: [Circular *1] },
        prev: null },
    tail: <ref *2> Node {
        data: 456,
        next: null,
        prev: <ref *1> Node { data: 123, next: [Circular *2], prev: null }},
    length: 2
    } */
```
---
## printNode
노드 정방향 출력
```javascript
DoubleLinkedList.prototype.printNode = function(){
    process.stdout.write("head -> ");
    for(let node = this.head; node != null; node = node.next){
        process.stdout.write(`${node.data} - > `);
    }
    console.log("null");
};
```
## printNodeInverse
노드 역방향 출력
- 임의 배열에 값을 하나씩 넣어주고 끝에서부터 하나씩 출력한다.
```javascript
DoubleLinkedList.prototype.printNodeInverse = function(){
    let temp = [];

    process.stdout.write("null <- ");
    for(let node = this.tail; node != null; node = node.prev){
        temp.push(node.data);
    }
    for(let i = temp.length - 1; i >= 0; i--){
        process.stdout.write(`${temp[i]} <- `);
    }
    console.log("tail");
};
```
---
## append
가장 끝에 노드추가
- 전반적으로 연결리스트와 비슷하다 다만, 이중연결리스트이기 때문에 tail이 추가됨.
- 연결리스트에서 순회를 하여 마지막 값을 찾았다면 이중연결리스트에서는 O(1)으로 마지막 값을 찾을수 있어 바로 연결이 가능하다.
```javascript
DoubleLinkedList.prototype.append = function(value){
    let node = new Node(value);
    
    if(this.head === null){
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    this.length++;
};
```
## insert
특정위치에 노드 추가
- 연결리스트와 다르게 맨 끝쪽에 들어왔을때에 대한 업데이트가 추가 됨.
    - 제일 끝 노드를 찾아 current로 업데이트
    - current.next값으로 node를 업데이트
    - 서로 앞뒤로 연결 해 준다.

```javascript
DoubleLinkedList.prototype.insert = function(value, position = 0){
    if(position < 0 || position > this.length) return false;

    let node = new Node(value),
        current = this.head,
        index = 0,
        prev;
    if (position === 0){
        //head가 null이면 tail도 null값
        if(this.head === null){ 
            this.head = node;
            this.tail = node;
        } else {
            node.next = current;
            current.prev = node;
            this.head = node;
        }
    } else if(position === this.length){
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
    } else {
        while(index++ < position){
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;

        current.prev = node;
        node.prev = prev;
    }

    this.length++;
    return true;

};
```
---
## remove
특정값의 노드 삭제
- position이 0일 때 노드가 1개만 존재 할 경우
    - 더 이상 존재하는 노드가 없으니 tail을 null값으로 만들어준다.
- 마지막 노드가 삭제 될 경우
    - tail값을 현재값(삭제 될 값)의 전에 연결되어 있는 값으로 업데이트.
    - 업데이트 된 tail값은 마지막 요소가 됐으니 다음값으로 null을 가르키게 업데이트.
```javascript
DoubleLinkedList.prototype.remove = function(value){
    let current = this.head,
        prev = current;
    while(current.data != value && current.next != null){
        prev = current;
        current = current.next;
    }

    if(current.data != value) return null;

    if(current === this.head){
        this.head = current.next;
        if(this.length === 1) this.tail = null;
        else this.head.prev = null;
    } else if(current === this.tail){
        this.tail = current.prev;
        this.tail.next = null;
    } else {
        prev.next = current.next;
        current.next.prev = prev;
    }

    this.length--;
    return current.data;
};
```
## removeAt
특정 위치의 노드 삭제
- position이 0일 때 노드가 1개만 존재 할 경우
    - remove와 똑같이 작동.
- 마지막 노드가 삭제 될 경우
    - current값을 tail값으로 업데이트 한다.
    - 삭제를 위해 tail값에는 current.prev값을 업데이트, tail.next에는 null값을 업데이트한다.
```javascript
DoubleLinkedList.prototype.removeAt = function(position = 0){
    if(position < 0 || position > this.length) return null;

    let current = this.head,
        index = 0,
        prev;
    if(position === 0){
        this.head = current.next;
        if(this.length === 1) this.tail = null;
        else this.head.prev = null;
    } else if(position === this.length - 1){
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
    } else {
        while(index++ < position){
            prev = current;
            current = current.next;
        }

        prev.next = current.next;
        current.next.prev = prev;
    }

    this.length--;
    return current.data;
};
```
## TEST
```javascript
let doubleLinkedList = DoubleLinkedList();

doubleLinkedList.insert(1);
doubleLinkedList.insert(12);
doubleLinkedList.insert(123);
doubleLinkedList.printNode();
 // head -> 123 -> 12 -> 1 -> null
doubleLinkedList.printNodeInverse(); 
// null <- 123 <- 12 <- 1 <- tail

doubleLinkedList.removeAt(2);
doubleLinkedList.printNode();
// head -> 123 -> 12 -> null
```
현재 : current = 123, tail = 1, length = 3, position = 2
- position이 length - 1 인 2 이기 때문에 ```else if```문 실행
    - current = this.tail (1)
    - tail = current.prev(12)
    - tail.next = null
- 결국 제일 끝노드의 전 값과 끝노드의 다음값인 null값이 서로 연결됨으로써 끝노드(1)이 삭제된다.
```javascript
doubleLinkedList.removeAt(1);
```
---
## indexOf
특정값의 노드위치를 반환
- 인덱스만 반환 해 주는것이기 때문에 연결리스트와 같음
```javascript
DoubleLinkedList.prototype.indexOf = function(value){
    let current = this.head,
    index = 0;

    while(current != null){
        if(current.data === value) return index;

        index++;
        current = current.next;
    }

    return -1;
};
```