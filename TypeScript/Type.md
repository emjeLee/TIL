# Typescript Type
```:``` 과 ```type```을 적어주면 된다.
# Basic Type
```typescript
let a : number = 1; // 숫자
let b : string = '1'; // 문자
let c : boolean = true; // boolean

// 배열
let a : number[] = [1];
let b : string[] = ['1','two']; 
let c : boolean[] = [true]; 
```

 Typescript 스스로 타입을 정의 해 준다. (알아서 추론하게 하는것이 좋다)
```typescript
let a = 1; // let a: number
```

  player 내부에 있는 name은 **string으로 정의** 되었기 때문에 오류 발생
```typescript
const player = {
    name: "MJ"
}
player.name = 1 // Error
```


# Optional Type
아래와 같이 작성하면 에러가 발생한다. age의 값을 찾지 못 했기 때문.
```typescript
const player : {
    name: string,
    age: number
} = {
    name: "MJ" // Error
}
```

player 가 age 값을 갖거나 갖지않게 하기 위해서는 **?** 를 붙여 주면 선택적으로 사용 할 수 있게 된다. 여기서 age는 **number | undefined**의 값을 갖게 된다.
```typescript
const player : {
    name: string,
    age?: number
} = {
    name: "MJ"
}
```


# Alias (별칭)
다음과 같이 정의
- Type 자리에는 모든 타입이 올 수 있다.
```typescript
type NewType = Type;
```
많은 타입을 재사용 가능하다!
```typescript
type Player = {
    name: string,
    age?: number
}
const MJ : Player = {
    name: "MJ"
}

const LEE : Player = {
    name: "LEE",
    age: 20
}
```

Alias 를 통해 타입을 정의 해 줄 수도 있다.
```typescript
type Name = string;
type Age = number;

type Player = {
    name: Name,
    age?: Age
}
```
## 함수를 return 받기
playerMaker에는 age가 정의되어있지 않았기 때문에 에러를 발생시킨다.
```typescript
type Player = {
    name: string,
    age?: number
}

function playerMaker(name:string){
    return {
        name
    }
}

const mj = playerMaker("mj")
mj.age = 20 // Error

```
아래와 같이 Player 를 추가 해주면 mj의 타입은 Player가 되고, playerMaker은 함수이며 string으로 name을 받고, **Player 타입을 받는 함수**로 인식 된다. 따라서 age가 사용 가능해지는 것
```typescript
type Player = {
    name: string,
    age?: number
}

function playerMaker(name:string) : Player {
    return {
        name
    }
}
// 화살표 함수
// const playerMaker = (name:string) : Player => ({name})

const mj = playerMaker("mj")
mj.age = 20 // Error

```
## readonly
- readonly를 사용 해주면 말 그대로 읽기모드, 즉 속성값 변경이 불가능해진다.

아래와 같이 push는 사용할 수 없지만 filter, map같이 원본배열이 바뀌지 않는 메서드들은 사용이 가능
```typescript
const numbers: readonly number[] = [1,2,3,4]
numbers.push(5) // Error
```
## Tuple
정해진 갯수의 요를 가야 하는 array를 지정 할 수 있다.
- 특정 위치에 특정 타입이 있어야 한다.
- 최소한의 길이를 가져야 한다.
- JS에서는 평범한 배열로 보임
```typescript
// 최소 3개의 요소를 가지며 그 요소의 타입이 순서대로 string, number, boolean의 속성을 가져야 한다.
const player: [string, number, boolean] = ["mj", 1, true]
player[0] = 1 // Error
```

## any
- 모든것을 비활성화 시킨다.  

any를 사용하면 아무 타입이나 가질 수 있게 된다 즉, TS의 보호를 받지 못하게 되는 것 기존 JS와 같아진다고 보면 된다.  
```let a = [] : any타입을 갖게 된다.```
```typescript
// 오류가 나지 않음!!!
const a : any[] = [1,2]
const b : any = true
a+b // 결과값 => 1,2true
```
## unknown
- 변수의 타입을 미리 알지 못 할 때 사용.  

아래와 같이 작성했을 때 a의 타입이 unknown 이기 때문에 TS에서 허락해 주지 않는다. 따라서,
```typescript
let a:unknown;
let b = a + 1 //Error
```
확인해주는 작업을 한번 해 주어야 한다.
```typescript
let a:unknown;
// 이 범위안에서는 a가 number이기 때문에 가능.
if(typeof a === 'number'){
    let b = a + 1
}
```

## void
- 아무것도 return하지 않는 함수를 대상으로 사용.
- 보통 따로 지정해 주지 않는다 
 
```typescript
// hello 의 타입은 void
function hello(){
    console.log('hello')
}
```
## never
- 함수가 return하지 않을 때 발생.
```typescript
// return하지 않고 오류를 발생시키는 함수
function hello():never{
    throw new Error('x')
}
```
- 타입이 두가지 일 수도 있는 상황에 발생 할 수 있음.

name은 string 이거나 number 이어야 하고, 두 타입을 모두 확인 해 주었다. 따라서 name에 string, number 이외의 값이 들어오면 **else**의 name이 실행되고 그 타입은 **never**이기 때문에 코드는 작동하지 않는다.
```typescript
function hello(name:string|number){
    if(typeof name === 'string'){
        name // name의 타입은 string
    } else if(typeof name === 'number'){
        name // name의 타입은 number
    } else {
        name // name의 타입은 never
    }
}
```


