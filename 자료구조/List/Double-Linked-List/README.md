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
    -  DoubleLinkedList.remove(), DoubleLinkedList.removeAt()
- 데이터 위치 확인
    - DoubleLinkedList.indexOf()

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
    if(position > 0 || position > this.length) return false;

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