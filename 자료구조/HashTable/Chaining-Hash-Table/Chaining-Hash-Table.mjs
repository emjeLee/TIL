// 별도의 자료로주오 연결리스트를 병합 사용하여 Hash 충동를 해결한 해시테이블 기반 자료구조

// 연결리스트 기반
import { LinkedList } from "./Linked-List.mjs"

const HASH_SIZE = 37;

// Element() : ket, value 저장을 위한 생성자
function Element(key, value){
    this.key = key;
    this.value = value;
};

// ChainingHashTable() : 생성자 함수
function ChainingHashTable(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};

// hashCode() : 해시함수
ChainingHashTable.prototype.hashCode = function(key){
    let hash = 0; 
    for (let i = 0; i < key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash % HASH_SIZE;
};

// clear() : 초기화
ChainingHashTable.prototype.clear = function(){
    this.table = new Array(HASH_SIZE);
    this.length = 0;
};

// size() : 크기반환
ChainingHashTable.prototype.size = function(){
    return this.length;
};