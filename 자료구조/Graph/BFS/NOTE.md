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
