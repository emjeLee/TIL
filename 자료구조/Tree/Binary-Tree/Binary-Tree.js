// Node() : value와 left, right node 저장을 위한 생성자
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
};

// BinaryTree() : 시작 노드인 root를 저장하기 위한 생성자
function BinaryTree(){
    this.root = null;
};

// _insertNode() : 재귀로 트리를 순회하며 노드 추가(내부사용)
BinaryTree.prototype._insertNode = function(node, value){
    if(node === null){
        node = new Node(value);
    } else if(value < node.value){
        node.left = this._insertNode(node.left, value);
    } else if(value > node.value){
        node.right = this._insertNode(node.right, value);
    }
    return node;
};

// insert() : 노드 추가
BinaryTree.prototype.insert = function(value){
    this.root = this._insertNode(this.root, value);
};

// _preOrderTraverseNode() : 재귀로 트리를 전위 순회(내부 사용)
BinaryTree.prototype._preOrderTraverseNode = function(node, callback){
    if(node === null) return;

    callback(node);
    this._preOrderTraverseNode(node.left, callback);
    this._preOrderTraverseNode(node.right, callback);
}

// preOrderTraverseNode() : 전위 순회하며 노드 출력
BinaryTree.prototype.preOrderTraverse = function(callback){
    this._preOrderTraverseNode(this.root, callback);
};

// _preOrderTraverseNode() : 재귀로 트리를 중위 순회(내부 사용)
BinaryTree.prototype._inOrderTraverseNode = function(node, callback){
    if(node === null) return;

    this._inOrderTraverseNode(node.left, callback);
    callback(node);
    this._inOrderTraverseNode(node.right, callback);
}

// preOrderTraverseNode() : 중위 순회하며 노드 출력
BinaryTree.prototype.inOrderTraverse = function(callback){
    this._inOrderTraverseNode(this.root, callback);
};

// _preOrderTraverseNode() : 재귀로 트리를 후위 순회(내부 사용)
BinaryTree.prototype._postOrderTraverseNode = function(node, callback){
    if(node === null) return;

    this._postOrderTraverseNode(node.left, callback);
    this._postOrderTraverseNode(node.right, callback);
    callback(node);
}

// postOrderTraverseNode() : 후위 순회하며 노드 출력
BinaryTree.prototype.postOrderTraverse = function(callback){
    this._postOrderTraverseNode(this.root, callback);
};

