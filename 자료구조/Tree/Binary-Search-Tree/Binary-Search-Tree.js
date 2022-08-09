// Node() : value와 left, right node 저장을 위한 생성자
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
};

// BinarySearchTree() : 시작 노드인 root를 저장하기 위한 생성자
function BinarySearchTree(){
    this.root = null;
};

// _insertNode() : 재귀로 트리를 순회하며 노드 추가(내부사용)
BinarySearchTree.prototype._insertNode = function(node, value){
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
BinarySearchTree.prototype.insert = function(value){
    this.root = this._insertNode(this.root, value);
};

// _preOrderTraverseNode() : 재귀로 트리를 중위 순회(내부 사용)
BinarySearchTree.prototype._inOrderTraverseNode = function(node, callback){
    if(node === null) return;

    this._inOrderTraverseNode(node.left, callback);
    callback(node);
    this._inOrderTraverseNode(node.right, callback);
}

// preOrderTraverseNode() : 중위 순회하며 노드 출력
BinarySearchTree.prototype.inOrderTraverse = function(callback){
    this._inOrderTraverseNode(this.root, callback);
};

// _minNode() : 반복문으로 트리를 순회하며 최솟값 노드 탐색
BinarySearchTree.prototype._minNode = function(node){
    if (node === null) return null;

    while(node && node.left !== null){
        node = node.left
    }

    return node.value;
};

// _maxNode() : 반복문으로 트리를 순회하며 최댓값 노드 탐색
BinarySearchTree.prototype._maxNode = function(node){
    if(node === null) return null;

    while(node && node.right !== null){
        node = node.right;
    }

    return node.value;
}

// min() : 최솟값 노드 탐색
BinarySearchTree.prototype.min = function(node){
    return this._minNode(this.root);
};

// max() : 최댓값 노드 탐색
BinarySearchTree.prototype.max = function(node){
    return this._maxNode(this.root);
};

//_searchNode() : 재귀로 트리를 순회하며 값을 만족하는 노드 탐색
BinarySearchTree.prototype._searchNode = function(node, value){
    if(node === null) return false;

    if(node.value === value){
        return true;
    } else if (node.value > value){
        return this._searchNode(node.left, value);
    } else if (node.value < value){
        return this._searchNode(node.right, value);
    }
};

// search() : value노드 탐색
BinarySearchTree.prototype.search = function(value){
    return this._searchNode(this.root, value);
};