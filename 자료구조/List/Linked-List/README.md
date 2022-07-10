# 연결 리스트
모든 요소가 데이터와 포인터를 가지며, 다음 요소에 한 줄로 연결된 자료구조.
- 자료가 연결되어 있기 때문에 새로운 자료를 앞쪽에 추가/삭제 할 때 유용.
- 하지만 특정요소를 찾을때에는 순회를 해야 한다.
# 구현 메서드
- 노드 개수/ 값의 존재 여부/ 노드 출력 
    - LinkedList.size(), LinkedList.isEmpty(), LinkedList.printNode()
- 노드 추가 
    - LinkedList.append(), LinkedList.insert()
- 노드 삭제 
    - LinkedList.remove(), LinkedList.removeAt()
- 데이터 위치 확인 
    - LinkedList.indexOf()

---

## 객체생성
- 매개변수로 받은 data를 객체내의 data로 업데이트.
- next라는 포인터를 null로 설정해 준다.
```javascript
function Node(data){
    this.data = data;
    this.next = null;
};
```

## LinkedList 객체 생성
- head와 length를 갖는 객체 생성.
- 처음에 head는 연결된 값이 없으니 null로 설정 해 준다.
- 값이 없으니 length또한 0으로 시작. 
- LinkedList에는 아무것도 연결 되어 있지 않은 상태.
```javascript
function LinkedList(){
    this.head = null;
    this.length = 0;
};
```
## size()
- this.length로 객체의 length를 반환
```javascript
LinkedList.prototype.size = function(){
    return this.length;
};
```
## isEmpty()
- 노드의 존재 여부 확인
```javascript
LinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};
```
---
## TEST
- 객체 생성
```javascript
let linkedList = new LinkedList();
console.log(linkedList)  
// LinkedList { head: null, length: 0 }
```
- 새로운 node(객체) 1을 만듦. 
- null을 가르키고 있던 head를 node를 가르키게 한다.
- node의 next의 값은 null
```javascript
linkedList.head = new Node(1); 
linkedList.length++;
console.log(linkedList) 
// LinkedList { head: Node { data: 1, next: null }, length: 1 }
```
- head가 가르키고 있는 데이터 다음에 새로운 node 23을 추가한다.
- 처음 추가된 node: 1의 다음 값은 node: 23이 되고 node: 23의 다음 값은 null이 된다.
- head -> 1 -> 23 -> null 상태.
```javascript
linkedList.head.next = new Node(23);
linkedList.length++;
console.log(linkedList)
// LinkedList {
//  head: Node { data: 1, next: Node { data: 23, next: null } }, length: 2}
```

## printNode
값을 탐색 하여 노드 출력
- 첫 번째 값으로 head값을 셋팅.
- node가 null이 아닐 때 까지 반복문을 돈다.
- node의 값을 다음값으로 계속 업데이트 해 준다.
- console.log를 하면 개행을 하기 때문에 **process.stdout.write** 사용.
```javascript
LinkedList.prototype.printNode = function(){
    for (let node = this.head; node != null; node = node.next){
        process.stdout.write(`${node.data} -> `);
    }
    console.log("null");
};
``` 
## append
연결리스트 가장 끝에 노드 추가
- head가 null인 상황은 값이 없는 상태니까 바로 node값을 넣어준다.
- current.next값이 null 일 때의 current값이 마지막 요소 이기 때문에 current에 current.next의 값을 업데이트 해주면서 마지막 데이터를 찾는다
- 마지막 데이터를 찾았으면 추가 해줄 node를 current.next에 업데이트 한다.
```javascript
LinkedList.prototype.append = function(value){
    let node = new Node(value),
        current= this.head;

    if(this.head === null) {
        this.head = node;
    } else {
        while(current.next !== null){
            current = current.next;
        }
        current.next = node;
    }
    this.length++;
};
```