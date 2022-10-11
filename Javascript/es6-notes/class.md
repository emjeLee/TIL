# Class
- class에는 데이터가 들어있지 않고 무언가를 만들 수 있는 틀을 정의 해놓은 것이다.
    - 정의만 해 놓은거라서 메모리에 올라가지 않는다.
    - template, 청사진이라고 불린다.
# Object
-  class를 이용하여 데이터를 넣어 만드는 것.
    - 새로운 `instance`를 생성하면 `object`가 된다.
    - 메모리에 올라간다.
---
## Class declarations 
- `class`라는 키워드를 통해 Person이라는 class를 만든다.
- `constructor`라는 생성자를 통해 object를 만들때 필요한 데이터를 `전달`한다.
    - 전달받은 데이터를 할당해준다.
```javascript
class Person {
  // constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }

  // methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}
```
- `Person`에는 `name, age`가 전달된다.
```javascript
const lmj = new Person('lmj', '20');
console.log(lmj.name); // lmj
console.log(lmj.age); // 20
```
## Getter and setters
- class를 사용하는 사용자가 잘못사용해도 방어적인 자세로 만들수 있도록 하는 것.
- `get`로 값을 반환한다.
- `set`로 값을 설정한다.
    - 값을 설정하기 때문에 `value`를 받는다.
- `age Getter`를 정의하는 순간 `this.age`는 `Getter을 호출`한다.
- `age Setter`를 정의하는 순간 `= age` 값을 할당할 때 메모리의 값을 할당하는것이 아닌 `Setter`를 호출한다.
    - 즉 `set age`안에서 전달 된 `value`를 할당 할 때 메모리의 값을 업데이트하는 것이 아닌 `Setter 호출`이 무한으로 일어나게된다.
        
            이를 방지하기위해선 `Getter Setter`내에서 사용하는 변수이름을 다르게 설정 해줘야한다.
```javascript
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

   get age() {
    return this._age;
  }

  set age(value) {
    // if (value < 0) {
    //   throw Error('age can not be negative');
    // }
    this._age = value < 0 ? 0 : value;
  }
}
```
## Fields (public, private)
- `#`를 붙이면 `private`속성을 갖게 된다.
    - class내부에서만 값이 보여지고, 접근 및 값의 변경이 된다.
```javascript
class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined
```

## Inheritance
- `extends`를 통해 상속 받아 재사용이 가능하다.
- 필요한 함수를 재정의하여 사용할 수 있다.
    - `super`를 사용하면 부모의 method와 재정의한 method 모두 사용가능하다.
```javascript
// a way for one class to extend another class.
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color!`);
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('🔺');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }

  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw(); // drawing blue color!
console.log(rectangle.getArea()); // 400
const triangle = new Triangle(20, 20, 'red');
triangle.draw(); // drawing red color! / 🔺
console.log(triangle.getArea()); // 200
```
## Class checking: instanceOf
- class를 이용하여 만들어진 새로운 `instance`
- 해당 object가 class의 instance인지 판별
- JS에서 생성한 모든 object, class는 `JS의 Object를 상속`한 것이다.
```javascript
console.log(rectangle instanceof Rectangle); // T
console.log(triangle instanceof Rectangle); // F
console.log(triangle instanceof Triangle); // T
console.log(triangle instanceof Shape); // T
console.log(triangle instanceof Object); // T
console.log(triangle.toString()); // Triangle: color: red
```