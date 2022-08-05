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