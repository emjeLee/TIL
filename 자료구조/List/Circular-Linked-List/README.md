# 원형 연결 리스트
각 노드가 데이터와 포인터를 가지며, 원형 형태로 연결되어 있는 방식으로 데이터를 저장하는 자료구조
- 마지막 노드가 null이 아닌 **첫번째 노드**를 가르킴.
- 하나의 노드에서 시작해 리스트를 순회를 돌면 시작했던 노드로 되돌아오는것이 가능하다.

# 구현 메서드
- 노드 개수 / 값의 존재 여부
    - [CircularLinkedList.size()](#size), [CircularLinkedList.isEmpty()](#isempty)
- 노드 추가
    - [CircularLinkedList.append()](#append), [CircularLinkedList.insert()](#insert)
- 노드 삭제
    -  [CircularLinkedList.remove()](#remove), [(CircularLinkedList.removeAt()](#removeat)
- 노드 출력 / 데이터 위치 확인
    - [DoubleLinkedList.printNode()](#printnode), [(CircularLinkedList.indexOf()](#indexof)

## 객체 생성
```javascript
function Node(data){
    this.data = data;
    this.next = null;
};
```
## CircularLinkedList 생성자 함수 생성
```javascript
function CircularLinkedList(){
    this.head = null;
    this.length = 0;
};
```
## size
- this.length로 객체의 length를 반환
```javascript
CircularLinkedList.prototype.size = function(){
    return this.length;
};
```

## isEmpty
- 노드의 존재 여부 확인
```javascript
CircularLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};
```
---
## printNode
노드출력
- 0번째 노드를 무조건 출력 
- 노드가 null인 값이 없기 때문에 한바퀴를 돌았을 때를 인식하기위해 this.head(0번째노드)로 기저조건을 설정해준다.
```javascript
CircularLinkedList.prototype.printNode =function(){
    process.stdout.write("head -> ");
    if(this.length != 0){
        process.stdout.write(`${this.head.data} -> `);
        for(let node = this.head.next; node != this.head; node = node.next){
            process.stdout.write(`${node.data} -> `);
        }
    }
    console.log("head");
};
```
## append
가장 끝에 노드추가
- else 부분에서 기존 연결리스트는 끝 노드가 null이었으나 원형리스트에서는 없기때문에 this.head로 설정
- 위와 같이 끝에 삽입 해 준뒤 다시 첫노드를 가르키게 한다.
```javascript
CircularLinkedList.prototype.append = function(value){
    let node = new Node(value),
        current = this.head;

    if(this.head === null){
        this.head = node;
    } else {
        while(current.next != this.head){
            current = current.next;
        }
        current.next = node;
    }
    node.next = this.head;
    this.length++;
};
```
## insert
특정위치에 노드 추가
- position이 **0** 일경우
    - 끝 노드를 current에 넣어주면서 리스트 순회 (끝 노드를 head에 연결해주기 위함)
    - this.head = node, current.next = this.head를 업데이트
- position이 **1 이상** 일 경우
    - 연결리스트와 동일
    - 삽입된 위치가 끝 위치 일 경우 node.next = null 이기 때문에 head로 업데이트 해 준다.
```javascript
CircularLinkedList.prototype.insert = function(value, position = 0){
    if(position < 0 || position > this.length) return false;

    let node = new Node(value),
        current = this.head,
        index = 0,
        prev;
    if(position === 0){
        node.next = current;
        if(this.isEmpty()){
            current = node;
        } else {
            while(current.next != this.head){
                current = current.next;
            }
        }
        this.head = node;
        current.next = this.head;
    } else {
        while(index++ < position){
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;

        if(node.next === null) node.next = this.head;
    }
    this.length++;
    return true;
};
```
---
