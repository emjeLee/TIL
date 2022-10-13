# Json

### Javascript Object Notation

---

## Object to JSON

    JSON.stringify(value: any, replace?: (this:any, key:string, value: any))
    => any, space?: string | number): string (+1 overload)

-   `stringify(obj)`
-   value를 받아 string로 반환 해준다.
- 함수는 object에 포함된 데이터가 아니기 때문에 제외된다.
    - symbol또한 JS에만 존재하는 것이기 때문에 제외된다.
```javascript
let json = JSON.stringify(true);
console.log(json); // true

json = JSON.stringify(['apple', 'banana']);
console.log(json); //["apple", "banana"]

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: function () {
    console.log(`${this.name} can jump!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json); 
// {"name":"tori","color":"white","size":null,"birthDate":"2022-10-13T13:11:43.027Z"}
```
- 배열을 사용하여 원하는 `property`값만 얻을 수 있다.
- callbackfn을 사용하면 더욱 세밀한 값을 얻을 수 있다.
```javascript
json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(json); // {"name":"tori","color":"white","size":null}

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'name' ? 'lmj' : value;
});
console.log(json);
/* 
 key: , value: [object Object]
 key: name, value: tori
 key: color, value: white
 key: size, value: null
 key: birthDate, value: 2022-10-13T13:11:43.027Z
 key: jump, value: function () {
    console.log(`${this.name} can jump!`);
  }
*/

// {"name":"lmj","color":"white","size":null,"birthDate":"2022-10-13T13:11:43.027Z"}

```

## JSON to Object
-   `parse(json)`
- rabbit이 갖고있던 jump() 함수는 JSON화할 때 포함되지않기 때문에 `직렬화 된 rabbit을 변환한 obj`는 jump() 함수를 갖고있지않다.
- `obj.birthDate()`를 사용하면 오류가난다.
    - rabbit의 birthDate는 `new Date()`라는 object였지만 `parse`를 통해 변환된 값을 가진 obj의 birthDate는 `string화 된 날짜`값이기 때문이다.
```javascript
json = JSON.stringify(rabbit);
console.log(json);
const obj = JSON.parse(json, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
```