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
## remove
특정값의 노드 삭제
- 끝 부분 노드처리만 해 주면 된다.
- 삭제할 노드(현재 current)를 업데이트 해줄 data 변수선언
- **첫번째 요소가 삭제** 될 때 
    - 첫번째 요소가 변하면 맨끝의 요소의 다음값도 변경 되어야 한다. 
    - 마지막 노드(current)를 찾아 현재 head를 head.next값으로 업데이트, 찾은 마지막 노드는 업데이트 된 head값과 연결 해 준다.
```javascript
CircularLinkedList.prototype.remove = function(value){
    let current = this.head,
        prev = current,
        data;
    while(current.data != value && current.next != this.head){
        prev = current;
        current = current.next;
    }
    if(current.data != value){
        return null;
    }
    data = current.data;
    if(current === this.head){
        while(current.next != this.head){
            current = current.next;
        }
        this.head = this.head.next;
        current.next = this.head;
    } else {
        prev.next = current.next;
    }
    this.length--;
    return data;
};
```
## removeAt
특정 위치의 노드 삭제
- remove와 같이 끝 부분 노드처리만 해 주면 된다.
- **position이 0** 일 때
    - 첫번째 요소가 변하면 맨끝의 요소의 다음값도 변경 되어야 한다. 
    - head에 대한 데이터를 data변수에 할당 해 준다. (삭제 할 값)
    - 마지막 노드(current)를 찾아 현재 head를 head.next값으로 업데이트 (원래 head의 참조값 삭제 됨)
    - 유일하게 남은 참조값인 current.next에  this.head를 업데이트 해줌으로써 기존 0번째 노드의 데이터를 1번값 으로 업데이트된 데이터로 설정해준다.
```javascript
CircularLinkedList.prototype.removeAt = function(position = 0){
    if(position < 0 || position > this.length) return null;

    let current = this.head,
        index = 0, 
        prev,
        data;

    if(position === 0){
        data = current.data;
        while(current.next != this.head){
            current = current.next;
        }
        this.head = this.head.next;
        current.next = this.head;
    } else {
        while(index++ < position){
            prev = current;
            current = current.next;
        }
        data = current.data;
        prev.next = current.next;
    }
    this.length--;
    return data;
};
```
## indexOf
특정값의 노드위치를 반환
- 기저조건이 current값이 head값과 같을 때 이다 이때 연결리스트와같이 while문을 쓰게 되면 시작을 head에서 하기 때문에 false가 되어 버린다. 그러므로 어떠한 조건없이 무조건 한번은 실행하는 do while을 통해 current값을 다음 노드로 한 번 이동시켜준다.
```javascript
CircularLinkedList.prototype.indexOf = function(value){
    let current = this.head,
        index = 0;
    do{
        if(current.data === value){
            return index;
        }
        index++;
        current = current.next;
    } while(current != this.head);

    return -1;
};
```