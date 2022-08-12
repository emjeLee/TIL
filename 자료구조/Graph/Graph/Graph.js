// 방향그래프
// Graph() : edge object 객체 저장을 위한 생성자
// key : vertex / value : list 형태로 연결된 vertex를 표현하여 edge 연결 관계 표현
function Graph(){
    this.edge = {};
}

// addVertex() : 정점(vertex)추가
Graph.prototype.addVertex = function(v){
    this.edge[v] = [];
};

// addEdge() : 간선(edge)추가
Graph.prototype.addEdge = function(v1, v2){
    this.edge[v1].push(v2);
};
