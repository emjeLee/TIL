# 비동기 작업이 가질 수 있는 3가지 상태
- Pending(대기상태) : 비동기작업이 진행중 이거나 작업을 진행 할 수없는 문제가 발생한 상태
- Fulfilled(성공) : 정상적으로 진행 완료
- Rejected(실패)  : 서버가 응답하지 않거나 시간이 오래걸려 작업이 취소 되는 등  

        Pending -> Fulfilled : resolve (성공)
        Pending -> Rejected : reject (실패)
---
# Promise를 사용한 비동기 처리
```executor```함수는 비동기작업을 실질적으로 수행하는 함수이다.  
비동기 작업 자체인 Promise를 ```asyncTask```에 저장해주는데, Promise객체를 생성하면서 객체 생성자로 실질적인 실행자 함수인 'executor'를 넘겨주게 되면 전달하는 순간 ```executor```를 실행시키게 된다.
```javascript
function isPositiveP(number){
    const executor = (resolve, reject) => {
        setTimeout(() => {
            if(typeof number === "number"){
                resolve(number >= 0 ? "양수" : "음수")
            } else {
                reject("주어진 값이 숫자형 값이 아닙니다.")
            }
        },2000);
    };
    const asyncTask = new Promise(executor) ;
    return asyncTask;
}

const res = isPositiveP(1);

res
    .then((res)=>{
        console.log("작업성공: ", res);
    })
    .catch((err)=>{
        console.log("작업실패: ", err);
    });
```
```isPositiveP```의 반환값이 'Promise<any>'가 되는것을 볼 수 있다. 어떠한 함수가 Promise를 반환 한다는것은 이 함수는 비동기 작업을 하는 것이며, 그 작업의 결과를 Promise객체로 반환받아 사용 할 수 있음을 의미한다.

    return asyncTask;
```isPositiveP```가 반환하는 Promise객체를 ```res```에 저장 해 준다. 'res'라는 상수가 반환받은 Promise객체를 이용해 비동기처리에 대한 resolve/reject결과값을 아무데서나 사용 할 수 있다.
   
    const res = isPositiveP(1);

'then/catch'를 사용 하면 ```resolve```를 수행 했을 때 결과 값을 ```then``` 콜백함수에서 받아 오고, ```reject```를 수행 했을 때는 ```catch``` 콜백함수에서 받아 온다.

    res
    .then((res)=>{
        console.log("작업성공: ", res);
    })
    .catch((err)=>{
        console.log("작업실패: ", err);
    });
---
# Promise로 콜백지옥 해결 하기
## 콜백지옥 예시
```javascript
function taskA(a, b, cb){
    setTimeout(() => {
        const res = a + b;
        cb(res);
    }, 3000);
};

function taskB(a, cb){
    setTimeout(() => {
        const res = a * 2;
        cb(res);
    }, 1000);
};

function taskC(a, cb){
    setTimeout(() => {
        const res = a * -1;
        cb(res);
    }, 2000);
};

taskA(3, 4, (a_res) => {
    console.log("task A: ", a_ res);
    taskB(a_res, (b_res) => {
        console.log("task B: ", b_res);
        taskC(b_res, (c_res) => {
            console.log("task C: ", c_res);
        })
    })
});
```
## Promise를 사용한 예시
```javascript
function taskA(a, b){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const res = a + b;
        resolve(res);
    }, 3000);
    })  
};

function taskB(a){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const res = a * 2;
        resolve(res);
    }, 1000);
    })
};

function taskC(a){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const res = a * -1;
        resolve(res);
    }, 2000);
    })
};

taskA(1,2).then((a_res) => {
    console.log("A RESULT: ", a_res);
    return taskB(a_res);
}).then((b_res) => {
    console.log("B RESULT: ", b_res);
    return taskC(b_res);
}).then((c_res) => {
    console.log("C RESULT: ", c_res);
});
```
- 이 코드의 반환값은 ```taskB(a_rea)```이다.  
- ```taskA```에 1,2를 전달하면 'Promise'객체를 전달 받고, 'then'을 사용하여 ```taskB(a_res)```호출 한 것을 전달 한 것.  
- 이 코드는 taskB를 반환받은 Promise이다. 따라서 이 뒤로 then을 사용하여 처리 할 수 있는 것이다.  
    
        taskA(1,2).then((a_res) => {
        console.log("A RESULT: ", a_res);
        return taskB(a_res);
        })
promise 객체를 이용하면 비동기처리를 호출하는 코드와 결과를 처리하는코드를 분리 해 줄 수 있다.
```javascript
//  bPromiseResult는 taskB를 반환한다.
const bPromiseResult = taskA(1,2).then((a_res) => {
    console.log("A RESULT: ", a_res);
    return taskB(a_res);
});

console.log(123);

bPromiseResult.then((b_res) => {
    console.log("B RESULT: ", b_res);
    return taskC(b_res);
}).then((c_res) => {
    console.log("C RESULT: ", c_res);
});

// result
// 123
// 3
// 6
// -6
```