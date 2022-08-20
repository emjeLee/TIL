# 힙
최댓값 혹은 최솟값을 빠르게 찾기 위해 **완전이진트리** 형태로 연산을 수행하는 자료구조
### 힙 대표 속성
- 정렬 : 각 노드의 값은 자식노드가 가진 값보다 작거나 혹은 큰 순서대로 정렬
- 형태 : 트리의 형태는 완전이진트리 모양

### 힙 종류
- 최소 힙 : 부모 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진트리
- 최대 힘 : 부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진트리

### 힙 구현
완전이진트리 성질을 만족하기 때문에 1차원 배열로 표현가능
- 현재노드
    - 부모노드 : (N - 1) / 2
    - 왼쪽자식노드 : (N * 2) + 1
    - 오른쪽자식노드 : (N * 2) + 2

## 구현 메서드
- 노드 위치 계산
    - Heap.parentIndex(), Heap.leftChildIndex(), Heap.rightChildIndex()
-  노드 값 확인
    - Heap.parent(), Heap.leftChild(), Heap.rightChild()
- 노드 추가/삭제(추출)
    - Heap.insert(), Heap.bubbleUp(), Heap.Down()
---
## 생성자 함수 및 기본 코드
```javascript
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

```
# 최소힙
## insert()
신규 노드 추가
- item을 먼저 배열의 제일 끝 쪽에 넣어준다.
- bubbleUp을 통해 정렬
```javascript
Heap.prototype.insert = function(item){
    this.items[this.size()] = item;
    this.bubbleUp();
};
```
## bubbleUp()
추가된 노드 위치 정렬
- 시작 위치를 마지막 값으로 설정 한다.
- 부모노드의 값과 비교하면서 위로 올라간다.
    1. 부모노드가 존재 하는지 확인한다.
    2. 존재한다면 현재값과 비교하여 swap을 통해 자리를 교체 해 준다.
    3. index를 바뀐자리인 parentIndex로 변경 해 준다.
    4. 부모노드가 존재하지 않거나 현재값보다 작은 부모노드를 만날 때 까지 반복.
```javascript
Heap.prototype.bubbleUp = function() {
    let index = this.size() - 1;
    while(this.parent(index) && this.parent(index) > this.items[index]){
        this.swap(this.parentIndex(index), index);
        index = this.parentIndex(index);
    }
};
```
## extract()
root노드 반환 및 삭제
- 루트노드를 'item'변수에 저장을 해 준다.
- 마지막 노드를 루트 노드에도 넣어준다
- 마지막 노드 삭제
- bubbleDown을 통해 정렬
- item에 저장해 두었던 원래 루트노드값을 반환한다.
```javascript
Heap.prototype.extract = function(){
    let item = this.items[0];
    this.items[0] =  this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
};
```

## bubbleDown()
대체된 root 노드 위치 정렬
- 루트에 새로운 값이 있기 때문에 0부터 시작해서 아래로 내려간다.
- 왼쪽자식노드가 존재하고, 나의 값보다 작다면 먼저 왼쪽 자식노드로 설정 해 준다
    - 왼쪽자식노드부터 보는 이유는 완전 이진트리이기 때문에 왼쪽 자식이 존재하면 오른쪽 자식이 존재한다.
    - 설정 후 오른쪽 자식노드가 존재한다면, 비교한다. 더 작다면 오른쪽 자식노드로 다시 값을 설정 해 준다.
- this.swap를 이용하여 왼쪽/오른쪽 자식노드와 나의 위치를 바꾼다.
- 현재 나의 위치를 교환한 원래 왼쪽/오른쪽 자식노드였던 index번호로 업데이트 해준다
- 더 이상 자식노드가 없거나 나보다 큰 값을 만날 때 까지 반복한다.
```javascript
Heap.prototype.bubbleDown = function(){
    let index = 0;
    while(this.leftChild(index) && (this.leftChild(index) < this.items[index] || this.rightChild(index) < this.items[index])){
        let childIndex = this.leftChildIndex(index);
        if(this.rightChild(index) && this.rightChild(index) < this.items[childIndex]){
            childIndex = this.rightChildIndex(index);
        }
        this.swap(childIndex, index);
        index = childIndex;
    }
};
```
---
# 최대 힙
전반적으로 최소힙과 같다 비교하는 부분의 부등호만 '>' 에서 '<' 로 변경 해 주면된다.
## insert2()
신규 노드 추가
```javascript
Heap.prototype.insert2 = function(item){
    this.items[this.size()] = item;
    this.bubbleUp2();
};
```
## extract2()
root노드 반환 및 삭제
```javascript
Heap.prototype.extract2 = function(){
    let item = this.items[0];
    this.items[0] =  this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown2();
    return item;
};
```
## bubbleUp2()
추가 된 노드 위치 정렬
```javascript
Heap.prototype.bubbleUp2 = function(){
    let index = this.size() - 1;
    // changed from '>' to '<'
    while(this.parent(index) && this.parent(index) < this.items[index]){
        this.swap(this.parentIndex(index), index);
        index = this.parentIndex(index);
    }
};
```
## bubbleDown2()
대체된 root 노드 위치 정렬
```javascript
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
```