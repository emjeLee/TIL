// Heap() : 배열 내 요소를 저장하기 위한 생성자
function Heap(){
    this.items = [];
};

// swap() : 배열 내 두 요소 위치를 변경
Heap.prototype.swap = function(index1, index2){
    let temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
};

// parentIndex() : 부모 노드의 위치 반환
Heap.prototype.parentIndex = function(index){
    return Math.floor((index - 1) / 2);
};

// leftChildIndex() : 왼쪽 자식 노드의 위치 반환
Heap.prototype.leftChildIndex = function(index){
    return Math.floor((index * 2) + 1);
};

// rightChildIndex() : 왼쪽 자식 노드의 위치 반환
Heap.prototype.rightChildIndex = function(index){
    return Math.floor((index * 2) + 2);
};

// parent() : 부모 노드의 요소 값 반환
Heap.prototype.parent = function(index){
    return this.items[this.parentIndex(index)];
};

// leftChild() : 왼쪽 자식 노드의 요소 값 반환
Heap.prototype.leftChild = function(index){
    return this.items[this.leftChildIndex(index)];
};

// rightChild() : 오른쪽 자식 노드의 요소 값 반환
Heap.prototype.rightChild = function(index){
    return this.items[this.rightChildIndex(index)];
}

// peek() : 현재 정렬된 최소/최대 요소값 반환
Heap.prototype.peek = function(){
    return this.items[0];
};

// size() : 현재 배열 내 크기 반환
Heap.prototype.size = function(){
    return this.items.length
};

// 최소힙
// insert() : 신규 노드 추가
Heap.prototype.insert = function(item){
    this.items[this.size()] = item;
    this.bubbleUp();
};

// bubbleUp() : 추가된 노드 위치 정렬
Heap.prototype.bubbleUp = function() {
    let index = this.size() - 1;
    while(this.parent(index) && this.parent(index) > this.items[index]){
        this.swap(this.parentIndex(index), index);
        index = this.parentIndex(index);
    }
};

// extract() : root노드 반환 및 삭제
Heap.prototype.extract = function(){
    let item = this.items[0];
    this.items[0] =  this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
};

// bubbleDown() : 대체된 root 노드 위치 정렬
Heap.prototype.bubbleDown = function(){
    let index = 0;
    while(this.leftChild(index) && (this.leftChild(index) < this.items[index] || this.rightChild(index) < this.items[index])){
        let childIndex = this.leftChildIndex(index);
        // if문이 실행되지 않는 오류발생. 확인해 보니 rightChild메서드에서 오타가 났다 () 대신 [] 로 오타가 났었음.
        if(this.rightChild(index) && this.rightChild(index) < this.items[childIndex]){
            childIndex = this.rightChildIndex(index);
        }
        this.swap(childIndex, index);
        index = childIndex;
    }
};

// 최대힙
// insert2() : 신규 노드 추가
Heap.prototype.insert2 = function(item){
    this.items[this.size()] = item;
    this.bubbleUp2();
};

// extract2() : root노드 반환 및 삭제
Heap.prototype.extract2 = function(){
    let item = this.items[0];
    this.items[0] =  this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown2();
    return item;
};

// bubbleUp2() : 추가 된 노드 위치 정렬
Heap.prototype.bubbleUp2 = function(){
    let index = this.size() - 1;
    while(this.parent(index) && this.parent(index) < this.items[index]){
        // changed from > to <
        this.swap(this.parentIndex(index), index);
        index = this.parentIndex(index);
    }
};

// bubbleDown2() : 대체된 root 노드 위치 정렬
Heap.prototype.bubbleDown2 = function(){
    let index = 0;
    while(this.leftChild(index) && (this.leftChild(index) > this.items[index] || this.rightChild(index) > this.items[index])){
        let childIndex = this.leftChildIndex(index);
        if(this.rightChild(index) && this.rightChild(index) > this.items[childIndex]){
            childIndex = this.rightChildIndex(index);
        }

        this.swap(childIndex, index);
        index = childIndex;
    }
}


//test
let maxHeap = new Heap();

maxHeap.insert2(90)
maxHeap.insert2(15)
maxHeap.insert2(10)
maxHeap.insert2(7)
maxHeap.insert2(12)
maxHeap.insert2(2)
maxHeap.insert2(8)
maxHeap.insert2(3)
console.log(maxHeap)

console.log(maxHeap.extract2());
console.log(maxHeap.extract2());
console.log(maxHeap.extract2());
console.log(maxHeap.extract2());
console.log(maxHeap.extract2());
console.log(maxHeap.extract2());