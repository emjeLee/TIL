# 그래프
정점과(=node) 간선으로 구성되어 네트워크 구조를 추상화한 비선형 자료구조
- 정점과 간선의 집합
- 다양한 그래프 종류를 혼합하여 표현가능
## 그래프의 종류
- 방향 그래프 : 간선에 특정 방향이 존재하는 그래프 (A -> B, A에서 B로만 이동가능)
- 무방향 그래프 : 간선에 특정 방향이 존재하지 않는 그래ㅍ (A - B, 양방향 이동 가능)
    - 연결 그래프 : 무방향 그래프에 있는 모든 정점쌍에 대해 항상 경로가 존재하는 그래프
    - 비연결 그래프 : 무방향 그래프에서 특정 정점쌍 사이에 경로가 존재하지 않는 그래프
- 가중치 그래프 : 간선에 비용이나 가중치가 할당된 그래프
- 순환 그래프 : 단순 경로의 시작 정점과 종료 지점이 동일하여 순환 지점이 존재하는 그래프
- 비순환 그래프 : 순환 지점이 없는 그래프
- 완전 그래프 : 그래프에 속해 있는 모든 정점이 서로 연결되어 있는 그래프
## 그래프 표현 방법
- 인접 리스트 : 정점에 연결된 다른 정점을 리스트로 표현
    - 연결리스트, 배열, 딕셔너리, 해쉬 등
- 인접 행렬 : 정점에 연결된 다른 정점을 정점 x 정점 크기의 매트릭스로 표현

## 구현 메서드
- 정점/간선 추가
    - [Graph.addVertex()](#addvertex), [Graph.addEdge()](#addedge)
- 정점/간선 삭제
    - [Graph.removeVertex()](#removevertex), [Graph.removeEdge()](#addedge)
-  정점/간선 개수, 그래프 출력
    - [Graph.sizeVertex()](#sizevertex), [Graph.sizeEdge()](#sizeedge), [Graph.print()](#print)
---
# 생성자 함수
- 방향그래프
## Graph()
edge object 객체 저장을 위한 생성자  
- key : vertex / value : list 형태로 연결된 vertex를 표현하여 edge 연결 관계 표현
```javascript
function Graph(){
    this.edge = {};
}
```
---
## addVertex() 
정점(vertex)추가
```javascript
Graph.prototype.addVertex = function(v){
    this.edge[v] = [];
};
```
## addEdge() 
간선(edge)추가
```javascript
Graph.prototype.addEdge = function(v1, v2){
    this.edge[v1].push(v2);
};
```
# TEST
```javascript
let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E"]

for(let i=0; i<vertices.length; i++){
    graph.addVertex(vertices[i]);
};

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "F");
graph.addEdge("B", "I");
graph.addEdge("E", "I");

console.log(graph.edge);
```
## result
```javascript
{
  A: [ 'B', 'C', 'D' ],
  B: [ 'F', 'I' ],
  C: [ 'G' ],
  D: [ 'G', 'H' ],
  E: [ 'I' ]
}
```
---
## removeEdge() 
간선 삭제
- key값이 Edge에 존재하는지 확인
- 삭제하고자하는 값이 key값 내에 존재하는지 list를 확인
- 삭제 후 빈 배열이 되었다면 (값이 1개였다면) key값도 지워준다.
```javascript
Graph.prototype.removeEdge = function(v1, v2){
    if(this.edge[v1]){
        let idx = this.edge[v1].indexOf(v2);
        if(idx !== -1){
            this.edge[v1].splice(idx,1);
        }
        if(this.edge[v1].length === 0){
            delete this.edge[v1];
        }
    }
};
```
## removeVertex()
정점 삭제
- 정점 삭제 후 이어져있는 간선들까지 삭제 해 줘야한다.
- for문을 돌면서 삭제를 했을 시 초기의 인덱스값과 원본객체들이 변경되기때문에 복사하여 처리 해 준다.
```javascript
Graph.prototype.removeVertex = function(v){
    if(this.edge[v] === undefined) return;
    let length = this.edge[v].length;
    let connectedVertex = [...this.edge[v]];
    for(let i = 0; i<length; i++){
        this.removeEdge(v, connectedVertex[i]);
    }
};
```
# TEST
```javascript
let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E"]

for(let i=0; i<vertices.length; i++){
    graph.addVertex(vertices[i]);
};

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "F");
graph.addEdge("B", "I");
graph.addEdge("E", "I");

graph.removeEdge("E","I");
graph.removeVertex("B");
```
## result
```javascript
// graph.removeEdge("E","I");
{
    A: [ 'B', 'C', 'D' ],
    B: [ 'F', 'I' ],
    C: [ 'G' ],
    D: [ 'G', 'H' ]
  }
// graph.removeVertex("B");
{
    A: [ 'B', 'C', 'D' ],
    C: [ 'G' ],
    D: [ 'G', 'H' ]
  }

```
---
## sizeVertex()
vertex 개수 반환
```javascript
Graph.prototype.sizeVertex = function(){
    return Object.keys(this.edge).length; 
};
```
## sizeEdge()
edge 개수 반환
```javascript
Graph.prototype.sizeEdge = function(vertex){
    return this.edge[vertex] ? Object.keys(this.edge[vertex]).length : 0;
};
```
## print
현재 Graph 연결 상태 출력
- edge내에서 키 값을 하나 씩 vertex로 받아 해당 vertex에 있는 배열 리스트를 neighbors에 할당.
```javascript
Graph.prototype.print = function(){
    for(let vertex in this.edge){
        let neighbors = this.edge[vertex];
        if(neighbors.length === 0) continue;

        process.stdout.write(`${vertex} -> `);
        for(let j=0; j<neighbors.length; j++){
            process.stdout.write(`${neighbors[j]}`);
        }
        console.log("");
    }
};
```
# 무방향 그래프
간선 추가/삭제 시 v1 -> v2였다면 v2 -> v1에 대한 실행문도 작성 해준다.
## addEdge() 
간선(edge)추가
```javascript
Graph.prototype.addEdge = function(v1, v2){
    this.edge[v1].push(v2);
    this.edge[v2].push(v1);
};
```
## removeEdge() 
간선 삭제
```javascript
Graph.prototype.removeEdge = function(v1, v2){
    // v1 -> v2
    if(this.edge[v1]){
        let idx = this.edge[v1].indexOf(v2);
        if(idx !== -1){
            this.edge[v1].splice(idx,1);
        }
        if(this.edge[v1].length === 0){
            delete this.edge[v1];
        }
    }
    // v2 -> v1
    if(this.edge[v2]){
        let idx = this.edge[v2].indexOf(v1);
        if(idx !== -1){
            this.edge[v2].splice(idx,1);
        }
        if(this.edge[v2].length === 0){
            delete this.edge[v2];
        }
    }
};
```
# TEST
방향그래프에서 ```graph.removeVertex("B");```문을 실행하면
```javascript
{
    A: [ 'B', 'C', 'D' ],
    C: [ 'G' ],
    D: [ 'G', 'H' ]
  }
```
A에는 B가 남아 있었는데, 무방향그래프에서는 완벽하게 삭제 된 것을 볼 수 있다.
```javascript
{
    A: [ 'C', 'D' ],
    C: [ 'G' ],
    D: [ 'G', 'H' ]
  }
```