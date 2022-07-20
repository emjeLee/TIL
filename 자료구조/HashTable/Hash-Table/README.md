# Hash 충돌 해결
### 기존 코드
- 'lose lose' 해시 함수
    - 키를 구성하는 문자의 아스키 값을 단순히 더한 것.
- index에 값이 있으면 추가 하지 않는다. (해시 충돌)

```javascript
// 해시함수
HashTable.prototype.hashCode = function(key){
    let hash = 0;
    for (let i=0; i<key.length; i++){
        hash += key.charCodeAt(i);
    }
    return hash % HASH_SIZE;
};

. 
.
.

// 데이터 추가 함수
HashTable.prototype.put = function(key, value){
    let index = this.hashCode(key);
    // 어느위치에 저장되는지 확인
    console.log(`key: ${key} -> index: ${index}`);

    if(this.table[index] !== undefined) return false;

    this.table[index] = new Element(key, value);
    this.length++;

    return true;
};
```

### 변경 코드
- 'djb2' 해시 함수

```javascript
HashTable.prototype.hashCode = function(key){
    let hash = 5381; //seed
    for (let i=0; i<key.length; i++){
        hash += hash * 33 + key.charCodeAt(1);
    }
    return hash % HASH_SIZE;
};

```
