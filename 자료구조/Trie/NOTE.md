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
```javascript
Trie.prototype.delete = function(word, current = this.root, index = 0){
    if(index === word.length){
        if(!current.endOfWord){
            return false;
        }

        current.endOfWord = false;
        return Object.keys(current.children).length === 0;
    }

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