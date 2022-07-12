# 이중 연결 리스트
각 노드가 데이터와 포인터를 가지며, 두 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료구조
- 양쪽으로 연결되어 있기 때문에 노드를 탐색할 때 용이함.
- 하지만 이전노드를 저장할 변수를 하나 더 생성해야 하기 때문에 메모리를 더 많이 사용한다.
# 구현 메서드
- 노드 개수 / 값의 존재 여부
    - DoubleLinkedList.size(), DoubleLinkedList.isEmpty()
- 순 차출력 / 역 출력
    - DoubleLinkedList.printNode(), DoubleLinkedList.printNodelnverse()
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
