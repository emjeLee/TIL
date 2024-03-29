# 트리
그래프의 일종으로 두 노드 사이의 하나의 간선만 연결되어 있는, 최소 연결과 계층 형태의 비선형 자료구조

## 트리의 구조 및 용어
- 노드(node) : 하나 이상의 값을 갖는 객체 단위
- 간선(edge) : 두 노드를 연결하는 선
- 루트 노드(Root node) : 부모가 없는 최상위 노드 (시작위치)
- 단말 노드(Leaf node) : 자식이 없는 노드
- 부모 노드(Parent node) : 특정 sub-Tree 내에서의 상위노드
- 자식 노드(Child node) : 특정 sub-Tree 내애서의 하위노드
- 형제(Sibling) : 자식 노드끼리간의 관계 (같은 부모를 가짐)
# 트리의 특징
'최소 연결 트리'로 불린다. 계층 모델, 방향 비순환그래프의 한 종류

### 트리의 종류
- 이진트리
- 이진 탐색 트리
- AVL트리
- 힙(Heap)
---
#### 용어
- 노드 크기(size) : 자신을 포함한 모든 자손 노드의 개수
- 노드 깊이(depth) : 루트에서 특정 노드에 도달하기 위한 간선의 개수
- 노드 레벨(level) : 트리의 특정 깊이를 가지는 노드의 집합
- 노드 차수(degree) : 노드가 지닌 가지의 수
- 트리 차수(tree degree) : 트리의 최대 차수
- 트리 높이(height) : 루트 노드의 가장 깊숙이 있는 노드의 깊이
# 트리 순회
트리 구조에서 각각의 노들르 정확히 한 번씩 체계적인 방법으로 방문하는 과정
- N(Node) : 해당 노드를 방문
- L(Left) : 왼쪽 서브 트리로 이동
- R(Right) : 오른쪽 서브 트리로 이동
---
## 순회방식
### 전위순회(Pre-order) : N - L - R
1. 노드를 방문한다.
2. 왼쪽 서브트리를 전위 순회한다. 
3. 오른쪽 서브트리를 전위 순회한다.
```javascript
preorder(node)
    print node.value
    if node.left !== null then preorder(node.left)
    if node.right !== null then preorder(node.right)
```
### 중위순회(In-order) : L - N - R
1. 왼쪽 서브트리를 중위 순회한다.
2. 현재 노드를 방문한다.
3. 오른쪽 서브트리를 중위 순회한다.
```javascript
preorder(node)
    if node.left !== null then preorder(node.left)
    print node.value
    if node.right !== null then preorder(node.right)
```
### 후위순회(Post-order) : L - R - N
1. 왼쪽 서브트리를 후외 순회한다.
2. 오른쪽 서브트리를 후위 순회한다.
3. 현재 노드를 방문한다.
```javascript
preorder(node)
    if node.left !== null then preorder(node.left)
    if node.right !== null then preorder(node.right)
    print node.value
```
### 층별순회(Level=order) : 낮은 Level부터 순차적으로 순회(=bfs)
1. root노드 방문
2. Level 증가
3. 왼쪽에서 오른쪽 순으로 방문
```javascript
levelorder(root)
    q.enqueue(root)
    while not q.empty do
    node := q.dequeue()
    print node.value
    if node.left !== null then preorder(node.left)
    if node.right !== null then preorder(node.right)
```
---
# 이진 트리
각각의 노드가 **최대 두개의 자식노드**를 가지는 트리 자료구조
- 검색과 정렬 : 이진 탐색 트리와 이진 힙 구현에 활용
- 허프만 코딩 : 연관 분기 구조를 위한 데이터 표현에 활용

## 이진 트리의 종류
- 포화 이진 트리(Perfect binary tree)
- 완전 이진 트리(Complete binary tree)
- 정 이진 트리(Full binary tree)
- 편향 이진 트리(Skewed binary tree)
- 균형 이진 트리(Balanced binary tree)

---
## 포화 이진 트리
모든 레벨의 노드가 가득 채워져 있는 트리
- Leaf노드를 제외한 모든 자식은 2개의 노드를 보유
- 노드의 개수 : n < 2^n - 1

## 완전 이진 트리
마지막 레벨 전까지 노드가 가득 채워져 있고, 마지막 레벨은 왼쪽부터 순차적으로 채워져 있는 트리
- 배열을 사용해 효율적인 표현이 가능
- 노드의 개수 : n < 2^n - 1

## 정 이진 트리
모든 노드가 0개 또는 2개의 자식 노드만 갖는 트리
- proper 또는 plane 이진 트리라고도 불림
- 노드의 개수 : n <= 2^n - 1

## 편향 이진 트리
왼쪽 혹은 오른쪽으로 (한쪽으로) 치우쳐 있는 트리
- 각각의 높이에 하나의 노드만 존재
- 노드의 개수 : h

## 균형 이진트리
삽입/삭제가 이루어 질 때, 왼쪽 서브트릐와 오른쪽 서브트리의 높이차를 1이하로 맞추는 이진 탐색 트리
- 서브 트리 높이 차이가 항상 1이하로 유지
- AVL트리, Red-Black트리, B트리, B+트리, B*트리 가 있다.