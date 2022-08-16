// Queue() : 생정자 함수로 초기 데이터 설정
function Queue(array) {
    this.array = array ? array : [];
};

// getBuffer() : 객체 내 데이터 셋 반환
Queue.prototype.getBuffer = function(){
    return this.array.slice();
};

// isEmpty() : 객체 내 데이터 존재 여부
Queue.prototype.isEmpty = function(){
    return this.array.length === 0; 
};

let queue = new Queue([1,2,3]);
let data = queue.getBuffer();
console.log(data === queue) // false;

// enqueue() : 데이터 추가
Queue.prototype.enqueue = function(element){
    return this.array.push(element);
};

// dequeue() : (맨 앞의) 데이터 삭제
Queue.prototype.dequeue = function(){
    return this.array.shift()
};

// front() : 첫번째 데이터 반환
Queue.prototype.front = function(){
    return this.array.length === 0 ? undefined : array[0];
};

// size() :  큐 내 데이터 개수 확인
Queue.prototype.size = function(){
    return this.array.length;
};

// clear() : 초기화
Queue.prototype.clear = function(){
    this.array = [];
};

export { Queue };