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

// has() : 개체 존재 여부 확인 (key 정보를 배열로 반환)
Dictionary.prototype.has = function(key){
    return this.items.hasOwnProperty(key);
};

// set() : 개체 추가
Dictionary.prototype.set = function(key, value){
    return this.items[key] = value;
};

// get() : 개체의 value반환
Dictionary.prototype.get = function(key){
    return this.has(key) ? this.items[key] : undefined;
}

// remove() : 개체 삭제
Dictionary.prototype.remove = function(key){
    if(this.has(key)){
        delete this.items[key];
        return true;
    }
    return false;
};