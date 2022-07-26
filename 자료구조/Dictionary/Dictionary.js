// key-value 형태로 다양한 자료형 개체를 저장하는 자료구조(Map과 유사함)

// Dictionary() : 개체를 저장 할 생성자
function Dictionary(items = {}){
    this.items = items;
};

// getBuffer() : 모든 개체 반환
Dictionary.prototype.getBuffer = function(){
    return {...this.items};
};

// clear() :  초기화
Dictionary.prototype.clear = function(){
    return this.items = {};
};

// size() : 크기 반환
Dictionary.prototype.size = function(){
    return Object.keys(this.items).length;
};

