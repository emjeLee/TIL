# DFS
트리나 그래프 드에서 하나의 노드를 최대한 깊게 들어가면서 해를 찾는 탐색 기법
- 장점 : 인접한 후보 노드만 기억하면 되므로 적은 기억공간 소요, 노드가 깊은 단계에 있을 경우 빠르게 정답 산출
- 단점 : 선택한 경로가 답이 아닐 경우 불필요한 탐색을 함. 최단 경로를 구할 시 찾은 해가 정답이 아닐 수 있음
# 구현 메서드
- 재귀를 이용한 탐색
    - [Graph._dfsRecursiveVisit()](#dfsrecursivevisit)
- 스택을 이용한 탐색
    - [Graph._dfsLoopVisit()](#dfsloopvisit)
---
## 생성자 함수 및 추가 메서드
이미 방문한 노드인지를 판별하기 위해 visited값을 새로 추가함.
```javascript
function Graph(){
    this.edge = {};
    this.visited = {};
}

Graph.prototype.addVertex = function(v){
    this.edge[v] = [];
    // vertex를 추가 할 때 false상태로 추가
    this.visited[v] = false;
};

Graph.prototype.addEdge = function(v1, v2){
    this.edge[v1].push(v2);
};
```
---
## dfs() 
DFS탐색
```javascript
Graph.prototype.dfs = function(startVertex){
    this._dfsRecursiveVisit(startVertex);
};
```
## _dfsRecursiveVisit()
재귀를 이용한 탐색
- 어떠한 정점 값을 받아 그 정점값과 인접되어 있는 노드들을 neighbors에 할당 시킨다.
- neighbors의 길이 만큼 반복문을 돌면서 재귀를 통해 그 값의 인접되어 있는 값을 또 찾는다.
- neighbors에 값이 없다면 (연결되어 있는 값이 없다면) 반복문을 수행하지 않고 바로 return할 수 있게 코드를 추가 해 보았다.
- 방문 한 vertex는 visited를 true로 업데이트 해 준다.
```javascript
Graph.prototype._dfsRecursiveVisit = function(vertex){
    if(this.visited[vertex]){
        return;
    }
    this.visited[vertex] = true;
    console.log(`visit ${vertex}`);

    let neighbors = this.edge[vertex];
    // 추가
    if (neighbors === 0){
        return;
    }
    for(let i=0; i<neighbors.length; i++){
        this._dfsRecursiveVisit(neighbors[i]);
    }
};
```
# TEST
```javascript
let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

for(let i=0; i<vertices.length; i++){
    graph.addVertex(vertices[i]);
};

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
graph.print();
graph.dfs("A");
```
### graph.print();
```
A -> BCD
B -> EF
C -> G
D -> GH
E -> I
```
### graph.dfs("A");
```
visit "A"
visit "B"
visit "E"
visit "I"
visit "F"
visit "C"
visit "G"
visit "D"
visit "H"
```
1. A를 먼저 방문해 인접해 있는 값들을 neighbors에 넣는다.
    - neighbors = ['B', 'C', 'D'] (현재위치 : A)
2. neighbors의 첫 번째 값("B")을 방문 후 재귀를 통해 인접 한 값을 찾는다.
    - neighbors = ['E', 'F'] (현재위치 : B)
3. 2번으로 돌아가 'E'의 인접 노드를 찾는다
    - neighbors = ['I'] (현재위치 : E)
        - 'I'는 인접노드가 없으므로 'E'로 돌아간다.
        - 'E'또한 더 이상 인접한 노드가 없으므로 'B'로 돌아간다.
4. 반복
---
## dfs() 
DFS탐색
```javascript
Graph.prototype.dfs = function(startVertex){
    this._dfsLoopVisit(startVertex);
};
```
## _dfsLoopVisit()
스택을 이용한 탐색
- 전반적으로 재귀와 같으나 인접한 값들을 뒤에서부터 스택에 넣어준다.
- 기저조건 : stack에 값이 없을 때 까지
```javascript
Graph.prototype._dfsLoopVisit = function(vertex){
    let stack = new Stack();
    stack.push(vertex);

    while(!stack.isEmpty()){
        let vertex = stack.pop();
        if(this.visited[vertex]){
            continue;
        }

        this.visited[vertex] = true;
        console.log(`visit "${vertex}"`);

        let neighbors = this.edge[vertex];
        for(let i=neighbors.length - 1; i>=0; i--){
            stack.push(neighbors[i]);
        }
    }
};
```
# TEST
```javascript
let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

for(let i=0; i<vertices.length; i++){
    graph.addVertex(vertices[i]);
};

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
graph.print();
graph.dfs("A")
```
### graph.print();
```
A -> BCD
B -> EF
C -> G
D -> GH
E -> I
```
### graph.dfs("A");
```
visit "A"
visit "B"
visit "E"
visit "I"
visit "F"
visit "C"
visit "G"
visit "D"
visit "H"
```
1. A를 방문 후 인접 값 ['B', 'C', 'D']를 마지막 값부터 스택에 넣어준다
    - stack ['D', 'C', 'B']
2. stack.pop()을 통해 'B'를 꺼낸 후 visited를 true처리 후 B의 인접값을 stack에 push
    - stack ['D', 'C', 'E', 'F']
3. 반복
### stack 상태 변화
- A 방문 stack ['D', 'C', 'B'] (DCB 추가)
- B 방문 stack ['D', 'C', 'F', 'E'] (FE 추가)
- E 방문 stack ['D', 'C', 'F', 'I'] (I 추가)
- I 방문 stack ['D', 'C', 'F']
- F 방문 stack ['D', 'C']
- C 방문 stack ['D', 'G'] (G 추가)
- G 방문 stack ['D']
- D 방문 stack ['H', 'G'] (HG 추가)
    - G를 pop했으나 visited = true 상태 이기 때문에 continue가 됨
    - stack ['H']
- H 방문 stack []
- stack에 더 이상 값이 없으니 종료.
