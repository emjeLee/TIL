# 이중 연결 리스트
각 노드가 데이터와 포인터를 가지며, 두 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료구조
- 양쪽으로 연결되어 있기 때문에 노드를 탐색할 때 용이함.
- 하지만 이전노드를 저장할 변수를 하나 더 생성해야 하기 때문에 메모리를 더 많이 사용한다.
# 구현 메서드
- 노드 개수 / 값의 존재 여부
    - [DoubleLinkedList.size()](#size), [DoubleLinkedList.isEmpty()](#isempty)
- 순 차출력 / 역 출력
    - DoubleLinkedList.printNode(), DoubleLinkedList.printNodeInverse()
- 노드 추가
    - DoubleLinkedList.append(), DoubleLinkedList.insert()
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
