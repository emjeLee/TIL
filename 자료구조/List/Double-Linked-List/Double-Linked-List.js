// 각 노드가 데이터와 포인터를 가지며, 두 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료구조

//Node() : data와 point인 next, prev를 가지고 있는 객체
function Node(data){
    this.data = data;
    this.next = null;
    this.prev = null;
}

//LinkedList() : head, tail과 length를 가지고 있는 객체
function DoubleLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;
}

//size() : 연결 리스트 내 노드 개수 확인
DoubleLinkedList.prototype.size = function(){
    return this.length;
};

//isEmpty() : 객체 내 노드 존재 여부 파악
DoubleLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};