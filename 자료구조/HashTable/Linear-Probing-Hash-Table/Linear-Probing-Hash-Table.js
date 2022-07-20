// 충돌빈도를 높이기 위함
const HASH_SIZE = 5;

// Element() : key, value 저장을 위한 생성자 
function Element(key, value){
    this.key = key;
    this.value = value;
};

// LinearHashTable() : 생성자
function LinearHashTable(){
    this.table = new Array(HASH_SIZE);
    this.length = 0; //실제 데이터들이 몇 개 있는지 카운팅 
};

// hashCode() : 해시 함수
LinearHashTable.prototype.hashCode = function(key){
    let hash = 0;
    for (let i=0; i<key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash % HASH_SIZE;
};

// clear() : 초기화
LinearHashTable.prototype.clear = function(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};

// size() : 크기 반환
LinearHashTable.prototype.size = function(){
    return this.length;
};

// getBuffer() : 데이터 셋 반환
LinearHashTable.prototype.getBuffer = function(){
    let array = [];
    for(let i=0; i<this.table.length; i++){
        if(this.table[i]){
            array.push(this.table[i]);
        }
    }
    return array;
};

// print() : 데이터 셋 출력
LinearHashTable.prototype.print = function(){
    for(let i=0; i < this.length; i++){
        if(this.table[i]){
            console.log(`${i} -> ${this.table[i].key}: ${this.table[i].value}`)
        }
    }
};

// put() : 데이터 추가
LinearHashTable.prototype.put = function(key, value){
    let index = this.hashCode(key);
    let startIndex = index;
    console.log(`key: ${key} -> index: ${index}`);

    do{
        if(this.table[index] === undefined){
            this.table[index] = new Element(key, value);
            this.length++;
            return true;
        }
        index = (index + 1) % HASH_SIZE;
    }   
    while (index !== startIndex);
    return false;
};
