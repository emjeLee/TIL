# Array API

## 목차

-   [reduce](#reduece)

---

# reduce

> 배열의 각 요소에 대해 주어진 **reducer** 함수를 실행하고, 하나의 결과값을 반환한다.  
> 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 된다.

`arr.reduce(callback[, initialValue]`

> reduce()는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에대해 callback함수를 실행한다.

#### 콜백함수는 4개의 인자를 가진다.

-   accumulator
    -   콜백의 반환값을 누적한다.
    -   첫 호출시 `initialValue`가 제공 되었다면 `initialValue`의 값이다.
-   currentValue
    -   처리할 현재 요소
-   currentIndex (Optional)
    -   처리할 현재 요소의 인덱스
    -   `initialValue`가 있다면 0, 아니면 1부터 시작.
-   array (Optional)
    -   `reduce()`를 호출한 배열.
-   initialValue (Optional)
    -   최초 호출에서 첫 번째 인수에 제공하는 값.
    -   **초기값을 제공하지 않으면 배열의 첫 요소를 사용**
    -   빈 배열에서 초기값없이 `reduce()`를 호출하면 오류발생.

---

### reduce로 계산하기

1. 초기값으로 0을 받아 `acc` = 0 `cur` = 1 이된다.
    - 0 + 1 을 반환
2. acc는 전 단계 콜백에서 받은 반환값인 1부터 시작
    - `acc` = 1 `cur` = 2 가되어 1 + 2 값을 반환한다.
3. 배열의 요소를 다 돌 때까지 반복한다.

```javascript
const array = [1, 2, 3, 4, 5];

array.reduce((acc, cur) => acc + cur, 0);
```

---

### reduce로 객체 반환하기

지금까지 deduce를 계산목적으로만 사용했는데 생각보다 다양한 방법으로 사용이 가능했다.  
0이 아닌 `{}`를 초기값으로 제공하면서 객체를 생성할 수 있다.
1. acc = {}, cur = 'user1'
    - acc라는 Object에 user1 key값을 생성하는 것.
2. `return acc`
    - acc는 {user1 : []}로 업데이트 되었고 이를 반환.

```javascript
const list = ["user1", "user2"];

list.reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
}, {});
/* {
    user1 : [],
    user2 : [],
}*/
```
