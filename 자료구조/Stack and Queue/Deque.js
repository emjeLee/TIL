// Double-Ended Queue 약자로, 삽입과 삭제가 양쪽 끝에서 모두 발생할 수  있는 선형 자료 구조

// Deque() : 초기 속성값 설정을 위한 생성자 함수
function Deque(array = []){
    this.array = array;
};

// getBuffer() : 객체 내 데이터 셋 반환
Deque.prototype.getBuffer = function(){
    return this.array.slice();
};

// isEmpty() : 데이터 존재 여부
Deque.prototype.isEmpty = function(){
    return this.array.length === 0;
};


