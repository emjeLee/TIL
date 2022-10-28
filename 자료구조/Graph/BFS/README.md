# BFS
트리나 그래프 등에서 인접한 노드를 우선 방문하면서 넓게 움직이며 해를 찾는 탐색 기법
- 장점 : 최단 경로 탐색에서 구한 해가 정답임을 보장
- 단점 : 경로가 길어질 경우 탐색 범위가 증가하면서 DFS보다 많은 기억 공간 필요
# 구현 메서드
- 큐를 이용한 탐색
    - Graph.bfs(), Graph._bfsLoopVisit()
- 최단 경로 탐색
    - Graph.shortestPath(), Graph._bfsShortestPath(), Graph.from_to_path()
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
---
## bfs()
BFS 탐색
```javascript
Graph.prototype.bfs = function(startVertex){
    this._bfsLoopVisit(startVertex)
};
```
## _bfsLoopVisit()
큐를 이용한 BFS 탐색
- DFS의 방법과 유사하다 DFS는 stack을 써 리스트 마지막 값부터 넣어줬다면 DFS는 queue를 사용하기 때문에 리스트 앞 요소부터 넣어 dequeue를 사용 하였다.
- 기저조건 : queue에 값이 없을 때 까지
```javascript
Graph.prototype._bfsLoopVisit = function(vertex){
    let queue = new Queue();
    queue.enqueue(vertex);

    while(!queue.isEmpty()){
        let vertex = queue.dequeue();
        if(this.visited[vertex]){
            continue;
        }

        this.visited[vertex] = true;
        console.log(`visited "${vertex}"`);

        let neighbors = this.edge[vertex];
        for(let i=0; i<neighbors.length; i++){
            queue.enqueue(neighbors[i]);
        }
    }
};
```

## _bfsShortestPath()
다른 정점 간 최단 경로 비용 산출
- 최단경로를 저장하기 위한 변수 ```distance``` 와 그 경로를 저장하기 위한 변수 ```pre_visit```를 선언 후 존재하는 정점들의 초기값을 설정 해 준다.
- dequeue된 정점의 자식노드들을 queue에 넣어준다. 
    - 자식노드의 방문상태가 false 상태 라면 distance와 pre_visit값을 업데이트 시켜준다.
    - queue가 빈 값이 될 때까지 반복
```javascript
Graph.prototype._bfsShortestPath = function(vertex){
    let queue = new Queue();
    queue.enqueue(vertex);

    let distance = {};
    let pre_visit = {};
    for(let vertex in this.edge){
        distance[vertex] = 0;
        pre_visit[vertex] = null;
    }

    while(!queue.isEmpty()){
        let vertex = queue.dequeue();

        this.visited[vertex] = true;
        console.log(`visit "${vertex}`);

        let neighbors = this.edge[vertex];
        for(let i=0; i<neighbors.length; i++){
            if(!this.visited[neighbors[i]]){
                distance[neighbors[i]] = distance[vertex] + 1;
                pre_visit[neighbors[i]] = vertex;
                queue.enqueue(neighbors[i]);
            }
        }
    }
    return { distance, pre_visit };
};
```
# test
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

console.log(graph._bfsShortestPath("A"));
```
## result
```javascript
{
  distance: { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 },
  pre_visit: {
    A: null,
    B: 'A',
    C: 'A',
    D: 'A',
    E: 'B',
    F: 'B',
    G: 'D',
    H: 'D',
    I: 'E'
  }
}
```
결과값에서 의문점이 들었다.
'G'의 pre_visit 가 'C'여야 한다고 생각 했기 때문이다. 방문상태가 true라면 if문이 실행 되지 말야야하는데 'G'는 이미 'C'에서 방문을 했다고 생각했기 때문이다. 하지만 조건은 아래와 같다.
> if(!this.visited[neighbors[i]])   

부모노드의 방문여부가 아닌, 자식노드의 방문여부 였다. 부모노드를 방문한 상태에서 자식노드를 'queue'에 넣어주는 과정이니 당연히 실행이 되었던 것이다.
따라서 'C'를 마치고 'D'의 자식 노드를 순회 할 때 'G'의 'pre_visit'값이 업데이트 된 것 이다.

---
## _from_to_path()
from 정점에서 to 정점까지의 최단 경로 출력
- stack을 이용해 뒤에서부터 출력 해 줄거기 때문에 마지막 노드에서부터 시작 노드까지를 pre_visit를 통해 찾아 stack에 넣어준 뒤, pop을 통해 하나 씩 출력 해 준다.
    - 시작 노드와 만나면 반복문이 끝나게 되므로 시작 노드는 push로 직접 넣어준다ㅏ.
```javascript
Graph.prototype._from_to_ptah = function(pre_visit, from, to){
    let stack = new Stack();

    for(let v = to; v !== from; v = pre_visit[v]){
        stack.push(v);
    };
    stack.push(from;)

    while(!stack.isEmpty()){
        let v = stack.pop();
        process.stdout.write(`${v} -> `);
    }
    console.log("end");
};
```

## shortestPath()
정점과 정점 간 최단 경로 탐색
- '_bfsShortestPath'메서드를 통해 startVertex와 나머지 정점간의 최단경로를 산출 하여 'result'에 할당 해 준다.
- for..in..을 통해 'edge'에 있는 모든 'vertex'를 시작노드와의 최단경로를 '_form_to_path' 메서드를 통해 출력한다.
```javascript
Graph.prototype.shortestPath = function(startVertex){
    let result = this._bfsShortestPath(startVertex);

    // 확인을 위한 출력
    console.log(result.distance);
    console.log(result.pre_visit);

    for(let vertex in this.edge){
        if(vertex === startVertex) continue;
        this._from_to_path(result.pre_visit, startVertex, vertex);
    }
};
```