# 트라이
탐색 트리의 일종으로, 문자열이나 연관 배열을 저장하는데 사용되는 트리 자료구조
- 문자열 검색에 특화된 자료구조
- 문자열 길이가 M일 경우 O(M)의 시간 복잡도로 검색가능

## 구현 메서드
- 데이터 추가/검색/삭제
    - Trie.insert(), Trie.search(), Trie.delete()

# 생성자 함수

## TrieNode()
문자값과 단어 여부값 저장을 위한 노드 생성자
```javascript
function TrieNode(){
    this.children = {};
    this.endOfWord = false;
};
```
## Trie()
문자열 추가
```javascript
function Trie(){
    this.root = new TrieNode();
};
```
---
## Trie.insert()
문자열 추가
- child 노드를 확인한다.
    - 없다면 노드를 새로 생성 후 child 노드로 추가 해 준다.
    - 있다면 노드를 갱신한다.
- 끝 단어를 만날 때 까지 반복한다.
    - 끝 단어를 만났다면 'endOfWord'를 true로 업데이트 해 준다.
```javascript
Trie.prototype.insert = function(word){
    let current = this.root;

    for(let i = 0; i < word.length; i++){
        let ch = word[i];
        let node = current.children[ch];

        if(node === undefined){
            node = new TrieNode();
            current.children[ch] = node;
        }

        current = node;
    }
    current.endOfWord = true;
};
```
## search()
문자열 검색
- insert와 같이 단어 하나하나를 순회한다.
- 자식노드에 찾고자하는 'ch'값이 없다면 그것은 등록되지 않은 단어이므로 return false
- 순회를 다 돌았으면 현재 가르키고 있는 값의 endOfWord를 반환 한다.
    - 등록 된 단어이면 endOfWord = true로 설정되어 있어 true를 반환한다.
```javascript
Trie.prototype.search = function(word){
    let current = this.root;

    for (iet i = 0; i < word.length; i++){
        let ch = word[i];
        let node = current.children[ch];

        if(node === undefined){
            return false;
        }
        current = node;
    }
    return current.endOfWord;
}
```
## delete
문자열 삭제
- 재귀를 종료했을 때 반환되는값과 마지막 단어 여부 통해 isDelete의 실행여부가 결정 된다.

    word : 실제 삭제 할  단어 / current : 현재 노드를 가르키는 변수 / index : 현재 단어의 몇 번째의 위치인지 저장할 변수
    - 처음엔 단어만 받으면 되기 때문에 current 와 index는 재귀를 돌리며 필요한 정보이기 때문에 최촛값만 설정

- 'ch'에 현재 단어의 위치에 해당하는 값을 저장하고 그 값을 통해 'node'의 위치를 변경한다.
    - 이 node가 비어있다면 삭제할 단어가 없다는 것이니 return false를 한다.
- isDelete : 노드를 삭제 여부를 판단
    - delete() 재귀를 통해 단어, 설정한 'node', +1 된 인덱스를 넘겨주며 호출.
        1. 결국 호출 하면서 종료 조건 인 ```if(index === word.length)```에 도달한다.
        2. 현재 위치하고 있는 값이 마지막 값인지를 판단한다.
            - 마지막이 아니라면 return false를 통해 빠져나온다. (저장된 단어가 아님)
            - 마지막이라면 endOfWord = false를 해 준 뒤, (로직으로 돌아갔을때 이것을 통해 삭제여부를 결정) 자식노드가 있는지 확인하여 없으면 삭제해도 되는 노드이니 'true'를 반환 해준다.
    - 'delete = true' , 'node.endOfWord = F' 일 경우 true가 되어 if문 실행
    - 재귀를 빠져나왔으니 현재 값의 자식노드(ch값)를 삭제 해 주고, 다른 자식노드의 여부를 확인하여 true/false를 반환 해주며 이 전의 재귀로 돌아가며 반복한다.
```javascript
Trie.prototype.delete = function(word, current = this.root, index = 0){
// 종료 조건
    if(index === word.length){
        if(!current.endOfWord){
            return false;
        }

        current.endOfWord = false;
        return Object.keys(current.children).length === 0;
    }

// 로직 처리 부분
    let ch = word[index];
    let node = current.children[ch];
    
    if(node === undefined) return false;

    let isDeleteNode = this.delete(word, node, index +1) && !node.endOfWord;
    if(isDeleteNode){
        delete current.children[ch];
        return Object.keys(current.children).length === 0;
    }

    return false;
};
```
# TEST
```javascript
let trie = new Trie();

trie. insert('bee');
trie. insert('be');

trie.delete('bee');
```
## delete('bee') 
### 노드의 endOfWord 상태 
    (root) -> b(F) -> e(T) -> e(T)
### 1. delete('bee', this.root, 0) 실행.  
    현재 상태 [current = this.root / ch = 'b' / node = 'b' ]

- isDelete = this.delete(word, node, index + 1)을 통해 재귀 실행
### 2. delete('bee', 'b', 1) 실행.  
    현재 상태 [current = 'b' / ch = 'e' / node = 'e']
- isDelete = this.delete(word, node, index + 1)을 통해 재귀 실행
### 3. delete('bee', 'e', 2) 실행  
    현재 상태 [current = 'e' / index = 2]
- ```if(index === word.length)``` 종료 조건 실행
    1. 'current.endOfWord = true' 이므로 현재 가르키고 있는 'e'의 값을 'false'로 변경 해준다.
    2. 현재 'e'에는 자식 노드가 있기 때문에 'false'를 반환한다.
---
### 재귀 종료 후
--- 
1. [2번]으로 돌아간다.
    - 현재 상태 [current = 'b' / ch = 'e' / node = 'e']
    - isDeleteNode의 T/F 확인
        - this.delete = F && !node.endOfWord = T => return false
2. [1번]으로 돌아간다.
    - 현재 상태 [current = this.root / ch = 'b' / node = 'b' ]
        - this.delete = F && !node.endOfWord = F => return false
3. return false로 delete('be') 종료 
---
## delete('be') 실행 후 노드의 endOfWord 상태 
    (root) -> b(F) -> e(F) -> e(T)
```search()```는 ```endOfWord```로 판별하기 때문에 'be'의 'e'를 ```endOfWord = F```로 변경 해 줌으로써 해당 단어를 찾을때 'false'가 반환되어 삭제 되었다고 볼 수 있다.