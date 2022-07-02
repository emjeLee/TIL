// circularQueue() : 초기 속값 설정을 위한 생성자 함수
function CircularQueue(array = [], size = 5){
    this.array = array;
    this.size = array.length > size ? array.length : size;
    this.length = array.length;
    this.head = 0;
    this.tail = array.length;
}

// getBuffer() : 객체 내 데이터 셋 반환
CircularQueue.prototype.getBuffer = function(){
    return this.array.slice();
};

// isEmpty() : 데이터가 비어있는지 
CircularQueue.prototype.isEmpty = function(){
    return this.length == 0;
};

// isFull() : 데이터가 꽉 차 있는지
CircularQueue.prototype.isFull = function(){
    return this.length == this.size;
};

// enqueue() : 데이터 추가
CircularQueue.prototype.enqueue = function(element) {
    if(this.isFull()) return false;

    this.array[this.tail % this.size] = element;
    this.tail = (this.tail + 1) % this.size;
    this.length++;

    return true;
};

// dequeue() : 데이터 삭제
CircularQueue.prototype.dequeue = function(){
    if(this.isEmpty()) return undefined;

    let element = this.array[this.head];
    delete this.array[this.head];
    this.head = (this.head + 1) % this.size;
    this.length--;

    return element;
};

let c = new CircularQueue([1,2,3,4]);
console.log(c.enqueue(5))
console.log(c.enqueue(6))
console.log(c.dequeue())
console.log(c.dequeue())

console.log(c.enqueue(6))
console.log(c)