# async
함수앞에 ```async```를 붙여주게 되면 'Promise'를 반환하는 비동기 처리 함수가 된다.
```javascript
function Hello(){
    return "hello";
};

async function helloAsync(){
    return "hello Async";
};

console.log(hello()); // hello
console.log(helloAsync()); // promise{<pending>}
```
결국 'Promise'를 반환한다는 뜻은 ```then```을 사용 할 수 있다는 뜻 이다.
- 'hello Async'가 'res'에 전달이 되어 출력이 되었음.
- ```async```가 붙은 함수의 반환값은 비동기작업 객체 **Promise의 resolve의 결과 값** 이 된다.
```javascript
//console.log(helloAsync());
helloAsync().then.((res) => {console.log(res);})
```
---
# await
```await```는 'async'가 붙은 함수 내에서만 사용 가능하다

```javascript
function dalay(ms){
    // setTimeout 콜백함수안에 resolve말고 호출하는 것이 없으면 resolve자체를 전달해도 무방하다
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

async function helloAsync(){
    return delay(3000).then(() =>{
        return "hello Async";
    });
};

// async함수이기 때문에 then을 받아 실행 가능
helloAsync().then((res) => {
    console.log(res);
});
```
- ```await```을 비동기함수 호출앞에 붙이게 되면 **동기적인 함수** 처럼 작동하게 된다. 즉 ```await```이 붙은 함수를 다 처리 한 뒤, 다음코드를 실행 한다.

        async function helloAsync(){
            await delay(3000);
            return "hello async";
        };
