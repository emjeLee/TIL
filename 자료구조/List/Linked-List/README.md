# 연결 리스트
모든 요소가 데이터와 포인터를 가지며, 다음 요소에 한 줄로 연결된 자료구조.
- 자료가 연결되어 있기 때문에 새로운 자료를 앞쪽에 추가/삭제 할 때 유용.
- 하지만 특정요소를 찾을때에는 순회를 해야 한다.
# 구현 메서드
- 노드 개수/ 값의 존재 여부/ 노드 출력 
    - [LinkedList.size()](#size), [LinkedList.isEmpty()](#isempty), [LinkedList.printNode()](#printnode)
- 노드 추가 
    - [LinkedList.append()](#append), [LinkedList.insert()](#insert)
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

## printNode()
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
## append()
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
## TEST
```javascript
let linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(12);
linkedList.append(123);

linkedList.printNode();
```
- 현재의 head의 값이 null이기 때문에 if문에 의해 head에 바로 node를 연결.
```javascript
linkedList.append(1); // head -> 1 , current => head 상태가 된다.
```
- head에 값이 있으니 while문을 돌며 current값을 current.next로 업데이트 해주어 next의 값이 null인 요소가 나올 때 까지 반복
-  마지막 요소를 만나면 next값으로 추가된 node의 값을 연결 해 준다.
- 반복
```javascript
// head -> 1 -> null
// 12 -> null
linkedList.append(12);
```
## insert()
원하는 위치(position)에 노드 추가
- value와 position을 받는다 position의 기본값은 0.
- 내가 어디에 위치해있는지, 얼마만큼 이동했는지 알 수있는 index와 이전 노드 값을 저장할 prev를 선언.
- position 이 **0** 일 때
    - 첫 번째 값으로 들어가기 때문에 node.next 에 current(head)값을 넣어주고, this.head에 노드를 추가 시킨다.
- position이 **1 이상** 일 때 
    - index가 position의 값보다 크거나같을때 까지 반복.
        - prev값에 현재 위치 해 있는 current값을 넣어준다.
        - current은 다음값을 가리킨다.
    - index가 position값보다 크거나 같아지면 prev와 current 사이에 값을 넣어준다.

```javascript
LinkedList.prototype.insert  = function(value, position = 0){
    // position의 값이 0보다 작거나 list의 길이 보다 클 시 false를 반환. 
    if(position < 0 || position > this.length) return false;

    let node = new Node(value),
        current = this.head,
        index = 0,
        prev;
    
    if(position === 0){
        node.next = current;
        this.head = node;
    } else {
        while (index++ < position){
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;
    }

    this.length++;

    return true;
};
```
## TEST
```javascript
let linkedList = new LinkedList();

linkedList.insert(1);
linkedList.insert(12);
linkedList.insert(123);
// 123 -> 12 -> 1 -> null
```
현재 : current = 1 (head가 가르키고있는 노드)  

- index = 0 / position = 1 이므로 반복문 실행과 동시에 index++ 되어 1이 된다.
-  prev에 현재 current값을 업데이트 해준다.
-  current 는 current.next 다음 값을 업데이트 해준다.
현재 : prev = 123, current = 12
- 반복문을 빠져나오면 들어갈 위치가 정해 졌다는 뜻 이므로 node.next에 current를 넣어주고 prev.next에 node값을 넣어준다.
```javascript
linkedList.insert(11,1);
// 123 -> 11 -> 12 -> 1 -> null
```