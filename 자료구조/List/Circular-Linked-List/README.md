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
