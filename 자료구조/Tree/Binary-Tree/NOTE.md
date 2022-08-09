# 이진 트리 순회
각각의 노드가 최대 두개의 자식 노드를 가지는 트리 자료 구조를 순회하는 방법

## 구현 메서드
- 노드추가
    - [BinaryTree._insertNode()](#insertnode), [BinaryTree.insert()](#insert)
- 전위 순회
    - BinaryTree._preOrderTraverseNode(), BinaryTree.preOrderTraverse()
- 중위 순회
    - BinaryTree._inOrderTraverseNode(), BinaryTree.inOrderTraverse()
- 후위 순회
    - BinaryTree._postOrderTraverseNode(), BinaryTree.postOrderTraverse()
- 층별 순회
    - BinaryTree.levelOrderTraverseNode()
---
## 생성자 함수
```javascript
// value와 left, right node 저장을 위한 생성자
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
};

// 시작 노드인 root를 저장하기 위한 생성자
function BinaryTree(){
    this.root = null;
};
```
# 노드 추가

## _insertNode() 
재귀로 트리를 순회하며 노드 추가(내부사용)
- 현재값과 비교
    - 작으면 왼쪽, 크면 오른쪽에 보낸다.
    - 왼쪽, 오른쪽에 left, right pointer가 비어 있다면 추가 할 노드를 연결
    - 비어있지 않다면 하위 노드에서 비교하도록 넘겨준다.
```javascript
BinaryTree.prototype._insertNode = function(node, value){
    if(node === null){
        node = new Node(value);
    } else if(value < node.value){
        node.left = this._insertNode(node.left, value);
    } else if(value > node.value){
        node.right = this._insertNode(node.right, value);
    }

    // 새로 추가한 노드를 업데이트 해주기위해(복사 된 값이기 때문에) 먼저 반환을 해 준다.
    return node;
};
```
## insert() 
 노드 추가
```javascript
BinaryTree.prototype.insert = function(value){
    this.root = this._insertNode(this.root, value);
};
```
## TEST
```javascript
let tree = new BinaryTree();

tree.insert("F");
tree.insert("B");
tree.insert("A");
```
- _insertNode(node(=null), value(='F')) 로 전달.
- 현재 node의 값이 null 이기 때문에 새로운 Node객체를 만들어 줌
    - this.value = 'F', this.left = null, this.right = null
- node를 반환 해 준다.  
    - this.root = 'F'
```javascript
tree.insert("F");
```
- _insertNode(node(='F'), value(='B')) 로 전달.
- node의 값이 null 이 아니고 node의 값이 value값 보다 크니 왼쪽에 넣어준다.
    - this._insertNode(node.left(= null), value(= 'B'))
    - node의 값이 null이므로 'B'라는 새로운 객체를 왼쪽값으로 업데이트 시켜준다.
    - 노드 반환
-  B가 업데이트 된 후 node는 다시 'F'가 되어 node 반환 this.root = 'F'가 된다.
```javascript
tree.insert("B");
```
재귀로 인한 반복이 이루어진다.
---

# 전위 순회

### preOrderTraverseNode() 
전위 순회하며 노드 출력
```javascript
BinaryTree.prototype.preOrderTraverse = function(callback){
    this._preOrderTraverseNode(this.root, callback);
};
```
### _preOrderTraverseNode()
재귀로 트리를 전위 순회(내부 사용)
```javascript
BinaryTree.prototype._preOrderTraverseNode = function(node, callback){
    if(node === null) return;

    callback(node);
    this._preOrderTraverseNode(node.left, callback);
    this._preOrderTraverseNode(node.right, callback);
};
```
# TEST
```javascript
let tree = new BinaryTree();

tree.insert('F'); // root
tree.insert('B'); // F.left
tree.insert('A'); // B.left
tree.insert('D'); // B.right

// 출력하기 위한 코드
function printNode(node){
    process.stdout.write(`${node.value} -> `);
};

tree.preOrderTraverse(printNode);
console.log("end");
// F -> B -> A -> D -> end
```

```tree.preOrderTraverse(printNode)``` 를 통해 printNode는 preOrderTraverse의 매개변수 callback이 되고, this.root값을 받아 _preOrderTraverse가 실행 된다.  
node = 'F' , callback = printNode(node)가 됨.
1. ```callback(node)```를 통해 'F'를 먼저 출력 해 준다. 
2. ```this._preOrderTraverseNode(node.left, callback)``` 가 실행되어
    - node = 'B' , callback 상태
3. B 출력 ```this._preOrderTraverseNode(node.left, callback)``` 실행
    - node = 'A' , callback 상태
4. A 출력 ```this._preOrderTraverseNode(node.left, callback)``` 실행
    - node = null, callback 상태
    - 기저조건에 걸려 바로 return
    - node = A / right값이 없으므로 위와 동일
5. A를 빠져나와(B의 left 순회 끝) B의 right를 탐색 
6. 반복한다.

전위, 중위, 후위가 대체적으로 같음 node를 출력하는 순서에 따라 다르다.

---

# 층별순회
Queue를 사용해 node를 층별 순회하여 넣어주고 dequeue를 통해 출력.
```javascript
// Queue 객체 추가
function Queue(array){
    this.array = array ? array : [];
};

Queue.prototype.isEmpty = function(){
    return this.array.length === 0;
};
Queue.prototype.enqueue = function(element){
    return this.array.push(element);
};
Queue.prototype.dequeue = function(){
    return this.array.shift();
};
```

### levelOrderTraverse() 
충별 순회하며 노드 출력
- q가 빈 배열이 될 때까지 반복
```javascript
BinaryTree.prototype.levelOrderTraverse = function(callback){
    let q = new Queue();
    let node; // node가 저장 될 임시변수
    q.enqueue(this.root);
    while(!q.isEmpty()){
        node = q.dequeue();
        callback(node);
        if (node.left !== null) q.enqueue(node.left);
        if (node.right !== null) q.enqueue(node.right);
    }
};
```

# TEST
```javascript
let tree = new BinaryTree();

tree.insert('F'); // root
tree.insert('B'); // F.left
tree.insert('A'); // B.left
tree.insert('D'); // B.right

// 출력하기 위한 코드
function printNode(node){
    process.stdout.write(`${node.value} -> `);
};

tree.levelOrderTraverse(printNode);
console.log("end");
// F -> B -> A -> D -? end
```
1. ```q.enqueue(this.root)``` 를 통해 q에 "F"를 넣어주고, q의 값이 들어있으니 while문 실행, dequeue를 통해 node에 "F"를 할당 해 준다.  
**현재** q = [], node = F
2. node의 값 출력
3. ```if (node.left !== null) q.enqueue(node.left);```
    - node.left 의 값은 B 값이 있으므로 q에 넣어준다
4. ```if (node.right !== null) q.enqueue(node.right);```
    - 값이 없으므로 넘어 감.
**현재** q = ["B"], node = F
5. q에 값이 있으니 while문 처음으로 돌아와 node가 "B"로 업데이트 된다.
6. 이것을 반복하면 마지막 층까지 탐색이 가능하다. (q배열에 차례대로 왼쪽, 오른쪽노드의 왼쪽, 오른쪽 자식노드들이 있다면 왼쪽 자식노드부터 하나씩 들어감)