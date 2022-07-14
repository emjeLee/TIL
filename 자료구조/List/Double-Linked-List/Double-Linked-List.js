// 각 노드가 데이터와 포인터를 가지며, 두 줄로 연결되어 있는 방식으로 데이터를 저장하는 자료구조

//Node() : data와 point인 next, prev를 가지고 있는 객체
function Node(data){
    this.data = data;
    this.next = null;
    this.prev = null;
};

//LinkedList() : head, tail과 length를 가지고 있는 객체
function DoubleLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;
};

//size() : 연결 리스트 내 노드 개수 확인
DoubleLinkedList.prototype.size = function(){
    return this.length;
};

//isEmpty() : 객체 내 노드 존재 여부 파악
DoubleLinkedList.prototype.isEmpty = function(){
    return this.length === 0;
};

//pintNode() : 노드 정방향 출력
DoubleLinkedList.prototype.printNode = function(){
    process.stdout.write("head -> ");
    for(let node = this.head; node != null; node = node.next){
        process.stdout.write(`${node.data} - > `);
    }
    console.log("null");
};

// pintNodeInverse() : 노드 역방향 출력
DoubleLinkedList.prototype.printNodeInverse = function(){
    let temp = [];

    process.stdout.write("null <- ");
    for(let node = this.tail; node != null; node = node.prev){
        temp.push(node.data);
    }
    for(let i = temp.length - 1; i >= 0; i--){
        process.stdout.write(`${temp[i]} <- `);
    }
    console.log("tail");
};

// append() : 연결 리스트 가장 끝에 노드 추가
DoubleLinkedList.prototype.append = function(value){
    let node = new Node(value);
    
    if(this.head === null){
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    this.length++;
};

// insert() : 특정위치에 노드 추가
DoubleLinkedList.prototype.insert = function(value, position = 0){
    if(position > 0 || position > this.length) return false;

    let node = new Node(value),
        current = this.head,
        index = 0,
        prev;
    if (position === 0){
        if(this.head === null){
            this.head = node;
            this.tail = node;
        } else {
            node.next = current;
            current.prev = node;
            this.head = node;
        }
    } else if(position === this.length){
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
    } else {
        while(index++ < position){
            prev = current;
            current = current.next;
        }
        node.next = current;
        prev.next = node;

        current.prev = node;
        node.prev = prev;
    }

    this.length++;
    return true;

};

// remove () : 특정 값의 노드 삭제
DoubleLinkedList.prototype.remove = function(value){
    let current = this.head,
        prev = current;
    while(current.data != value && current.next != null){
        prev = current;
        current = current.next;
    }

    if(current.data != value) return null;

    if(current === this.head){
        this.head = current.next;
        if(this.length === 1) this.tail = null;
        else this.head.prev = null;
    } else if(current === this.tail){
        this.tail = current.prev;
        this.tail.next = null;
    } else {
        prev.next = current.next;
        current.next.prev = prev;
    }

    this.length--;
    return current.data;
};

// removeAt() : 특정 위치의 노드 삭제
DoubleLinkedList.prototype.removeAt = function(position = 0){
    if(position > 0 || position > this.length) return null;

    let current = this.head,
        index = 0,
        prev;
    if(position === 0){
        
    }
}
