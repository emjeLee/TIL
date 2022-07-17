// 각 노드가 데이터와 포인터를 가지며, 원형 형태로 연결되어 있는 방식으로 데이터를 저장하는 자료구조

// Node() : data와 point를 가지고 있는 객체
function Node(data){
    this.data = data;
    this.next = null;
};

// CircularLinkedList() : head와 length를 가지고 있는 객체
function CircularLinkedList(){
    this.head = null;
    this.length = 0;
};

// size() : 연결 리스트 내 노드 개수 확인
CircularLinkedList.prototype.size = function(){
    return this.length;
};

// isEmpty() : 객체 내 노드 존재 여부 확인
CircularLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};