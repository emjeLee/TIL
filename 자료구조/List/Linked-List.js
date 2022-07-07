// 각 노드가 데이터와 포인터를 가지며, 한 줄로 연결되어있는 방식으로 데이터를 저장하는 구조

//Node() : data와 point를 가지고 있는 객체
function Node(data){
    this.data = data;
    this.next = null;
};

//LinkedList() : head와 length를 가지고 있는 객체
function LinkedList(){
    this.head = null;
    this.length = 0;
};

// size() : 연결 리스트 내 노드 개수 확인
LinkedList.prototype.size = function(){
    return this.length;
};

// isEmpty() : 객체 내 노드 존재 여부 확인
LinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};

// printNode() : 노드 출력
LinkedList.prototype.printNode = function(){
    for (let node = this.head; node != null; node = node.next){
        process.stdout.write(`${node.data} -> `);
    }
    console.log("null");
};

// append() : 연결리스트 가장 끝에 노드 추가
LinkedList.prototype.append = function(value){
    let node = new Node(value),
        current= this.head;

    if(this.head === null) {
        this.head = node;
    } else {
        while(current.next !== null){
            current = current.next;
        }
        current.next = node;
    }
};

// insert() : position 위치에 노드 추가
LinkedList.prototype.insert  = function(value, position = 0){
    if(position < 0 || position > this.length) return false;

    let node = new Node(value),
        current = this.head,
        index = 0,
        prev;
    
    if(position === 0){
        node.next = current;
        this.head = node;
    } else {
        while (index++ < position){
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;
    }

    this.length++;

    return true;
};