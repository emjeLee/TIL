// key-value 형태로 다양한 자료형 개체를 저장하는 자료구조(Map과 유사함)

// Dictionary() : 객체를 저장 할 생성자
function Dictionary(items = {}){
    this.items = items;
};

// getBuffer() : 모든 객체 반환
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

// has() : 객체 존재 여부 확인 (key 정보를 배열로 반환)
Dictionary.prototype.has = function(key){
    return this.items.hasOwnProperty(key);
};

// set() : 객체 추가
Dictionary.prototype.set = function(key, value){
    return this.items[key] = value;
};

// get() : 객체의 value반환
Dictionary.prototype.get = function(key){
    return this.has(key) ? this.items[key] : undefined;
}

// remove() : 객체 삭제
Dictionary.prototype.remove = function(key){
    if(this.has(key)){
        delete this.items[key];
        return true;
    }
    return false;
};

// keys() : 모든 key값을 배열 형태로 반환
Dictionary.prototype.keys = function(){
    return Object.keys(this.items);
};

// values() : 모든 value값을 배열 형태로 반환
Dictionary.prototype.values = function(){
    return Object.values(this.items);
};

// each() : 모든 객체 요소에 대해 callback함수 수행 (:= foreach)
Dictionary.prototype.each = function(fn){
    for(let k in this.items){
        if(this.has(k)){
            fn(k, this.items[k]);
        }
    }
};

// printDictionary() : 객체 출력 callback
function printDictionary(key, value){
    console.log(`key: ${key}`);
    console.log(`value: ${value}`);
};