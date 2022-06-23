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

