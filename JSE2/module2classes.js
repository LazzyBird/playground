// reminding of creating objects with constructor function
{
  let Vehicle = function (id, latitude, longitude) {
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.time = Date.now();
    this.latitude = latitude;
    this.longitude = longitude;
  };
  let vehicle1 = new Vehicle("AL1024", 59.358615, 17.947589);
  vehicle1.setPosition(59.367647, 18.213451);
  console.log(vehicle1); // -> Vehicle {id: 'AL1024', status: 'unavailable', time: 1649347600000, latitude: 59.367647, longitude: 18.213451}
}
// refactoring of the above code
{
  let Vehicle = function (id, latitude, longitude) {
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.setPosition(latitude, longitude);
  };
}
// або у вигляді декларації класу:
{
  class Vehicle {
    constructor(id, latitude, longitude) {
      this.setPosition = function (latitude, longitude) {
        this.time = Date.now();
        this.longitude = longitude;
        this.latitude = latitude;
      };
      this.id = id;
      this.status = "unavailable";
      this.setPosition(latitude, longitude);
    }
  }
}
//what if we don't want to depend on the order of the fields?
{
  let Vehicle = function (initialData) {
    //The values will be recognized by their names, not by their order. The constructor accepts this object as the initialData parameter and decomposes it into individual fields. The following line:
    let { id, latitude, longitude } = initialData;
    // this is called destructuring assignment
    /* 🔼this line is actually nothing but:
let id = initialData.id;
let latitude = initialData.latitude;
let longitude = initialData.longitude;

      */
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.setPosition(latitude, longitude);
  };
  let vehicle1 = new Vehicle({
    id: "AL1024",
    latitude: 59.367647,
    longitude: 18.213451
  });
  let vehicle2 = new Vehicle({
    longitude: 18.213423,
    latitude: 59.367628,
    id: "AL1024"
  });
}
// some new iterations of code - getting rid of redundant use of usage initialData object
{
  let Vehicle = function ({ id, latitude, longitude }) {
    this.setPosition = function ({ latitude, longitude }) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.getPosition = function () {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    };
    this.id = id;
    this.status = "unavailable";
    this.setPosition({ latitude, longitude });
  };
  let vehicle1 = new Vehicle({
    id: "AL1024",
    latitude: 59.367647,
    longitude: 18.213451
  });
  let vehicle2 = new Vehicle({
    longitude: 18.213423,
    latitude: 59.367628,
    id: "AL1024"
  });
}

// finally classes wow
{
  class AlmostEmptyClass {
    constructor(sth) {
      console.log(sth);
    }
    sayHi() {
      console.log("Hi!");
    }
  }
  let almostEmptyObject = new AlmostEmptyClass(120); // -> 120
  almostEmptyObject.sayHi(); // -> Hi!
}
// another example
{
  // here is used constructor of class, some inmprovements and expalations in the next snippet
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.setPosition = function ({ latitude, longitude }) {
        this.time = Date.now();
        this.longitude = longitude;
        this.latitude = latitude;
      };
      this.getPosition = function () {
        return {
          latitude: this.latitude,
          longitude: this.longitude
        };
      };
      this.id = id;
      this.status = "unavailable";
      this.setPosition({ latitude, longitude });
    }
  }
  let vehicle1 = new Vehicle({
    id: "AL1024",
    latitude: 59.367647,
    longitude: 18.213451
  });
  let vehicle2 = new Vehicle({
    longitude: 18.213423,
    latitude: 59.367628,
    id: "AL1024"
  });
}

// moving methods getPosition and setPosition are unnecessarily declared inside the constructor
{
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.status = "unavailable";
      this.setPosition({ latitude, longitude });
    }
    setPosition({ latitude, longitude }) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    }
    getPosition() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  }
  let vehicle = new Vehicle({
    longitude: 18.213423,
    latitude: 59.367628,
    id: "AL1024"
  });
  vehicle.setPosition({ longitude: 18.193121, latitude: 59.378654 });
  console.log(vehicle.getPosition());
  //+ незважаючи на те що час фіксується в момент використання .setPosition, він ніде не зберігається, так що навіщо це тут - велике питання. можна додати до об'єкта властивість окремо після створення vehicle.time = Date.now() то воно буде фіксувати час довавання цієй властивості до об'єкту, а не час виклику метода .setPosition. Там нижче "покращений" клас з властивістю для зберігання часу створення, часу додавання позиції та методом, який додасть властивість та її значення після створення екземпляру класу до нього ж
}
{// спроба пофіксити безглузде використання часу. Конструктор містить інструкцію для створення екземпляру з полем в якому буде збережено час створення цього екземпляру, а також властивість в яку буде збережено час використання методу який встановлює позицію
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.status = "unavailable";
      this.setPosition({ latitude, longitude });
      this.time = Date.now(); // Зберігає час створення об'єкта
      this.positionTime = null; // cюди буде зберігатися значення яке повертає метод .setPosition
    }

    setPosition({ latitude, longitude }) {
      this.longitude = longitude;
      this.latitude = latitude;
      this.positionTime = Date.now(); // Зберігає час встановлення позиції
    }

    getPosition() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
    //* а тут метод який буде додавати властивість до екземпляру класу після його створення: (САМ ПРИДУМАВ, НІХТО НЕ ПІДКАЗАВ)
    addProperty({ property, value }) {
      this[property] = value;
      // ТАК РОБЛЯТЬ ГМО!!!!!
    }
  }
  const car = new Vehicle("123");
  car.addProperty("color", "red");
  car.addProperty("VIN", 6546568498)
  console.log(car.id, car.color, car.VIN, typeof (car.addProperty), typeof (car), typeof (Vehicle)) // -> 123 red 6546568498 function object function
}
{// one step back to functions - functions in JS are first class citizens - the ability to store functions in variables
  {//function declared with a name - namedFunction
    function namedFunction() {
      console.log("I'm named, I hope ... ");
    }
    // below the anonnymousFunction variable holds a reference to a function
    let anonymousFunction = function () {
      console.log("I'm a bit anonymous ...");
    };
    // hehe here is a declaration of a named function, which we assign to the variable notExactlyAnonymousFunction:
    let notExactlyAnonymousFunction = function anotherNamedFunction() {
      console.log("I'm confused ...");
    };
    namedFunction(); // -> I'm named, I hope ...
    anonymousFunction(); // -> I'm a bit anonymous ...
    notExactlyAnonymousFunction(); // -> I'm confused ...F
  }
  // this is true for classes as well - we can declare a named class, as it shown in the previous examples, but also store unnamed ones in a variable
  {// let's declare it using a class expression - decpite being substituted for a variable, it is still a class, not an object 🗿
    let AlmostEmptyClass = class {
      constructor(sth) {
        console.log(sth);
      }
      sayHi() {
        console.log("Hi!");
      }
    };
    let almostEmptyObject = new AlmostEmptyClass(120); // 120
    almostEmptyObject.sayHi(); // -> Hi!
    console.log(almostEmptyObject.constructor.name); // -> "AlmostEmptyClass"
  }
}
//+ JSE 2.1.3 The instance of operator
// продовження від 24-04-2024
{ // завдання переписати попередній клас як конструктор
  function AlmostEmpty() {
    this.nothing = null;
    this.logger = function (aargh) {
      console.log(aargh);
    }
  }
  const wow = new AlmostEmpty();
  wow.logger("wow"); // -> wow
  console.log(wow.constructor.name) // -> "AlmostEmpty"
  console.log(almostEmptyObject instanceof AlmostEmptyClass); // -> true
  console.log(almostEmptyObject instanceof String); // -> false
  let str = new String("test me");
  console.log(str instanceof String); // -> true
  console.log(almostEmptyObject instanceof Object); // -> true
  // це тому що всі об'єкти що створені на базі класу також імпліцитно створені з Object класу
  {
    let obj = new Object();
    console.log(Object.keys) // -> function keys() {[native code]}
  }
}
//+ JSE 2.2.3 Direct declaration inside the class body
{ //! Цей приклад з курсу містить багато помилок - це каже пісочниця курсу, й повинен сприйматися як порожне місце бо так для голови безпечніше. Але у тесті на цю пургу будуть питання
  //! при запуску у браузері видає помилку - цей код мертвий
  // Uncaught SyntaxError: Private field '#longitude' must be declared in an enclosing class
  class Vehicle {
    status = "unavailable"; // class properties must be methods expected ( but instead has =
    #longitude;
    #latitude;
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.setPosition({ latitude, longitude });
    }; // innecessary semicolon
    setPosition({ latitude, longitude }) {
      this.time = Date.now();
      this.#longitude = longitude; // Expected an identifier and instead saw '#'. Missing ';' before statement
      this.#latitude = latitude; // same error
    };
    getPosition() {
      return {
        latitude: this.#latitude, // Expected an identifier and instead saw "#". Expected '}' to match '{' from upper line and instead saw 'latitude' 
        longitude: this.#longitude
      };
    };
  };
  let vehicle = new Vehicle({ longitude: 18.213423, latitude: 59.367628, id: "AL1024" }); // a bunch of syntax errors
  console.log(vehicle.getPosition());
  console.log(vehicle.#longitude); // error
  //Property '#longitude' is not accessible outside class 'Vehicle' because it has a private identifier. - intended error
  //done потім подивлюся на це щось вони перемутили
}
//+ JSE2 2.3.1 Getters and setters
{
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.position = { latitude, longitude };
      this.status = "unavailable";
    }
    set position({ latitude, longitude }) {
      this.time = Date.now(); // походу цей час також ніде не зберігається
      this.longitude = longitude;
      this.latitude = latitude;
    }
    get position() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  }
  let vehicle = new Vehicle({ longitude: 18.213423, latitude: 59.367628, id: "AL1024" });
  vehicle.position = { longitude: 18.193121, latitude: 59.378654 };
  console.log(vehicle.position); // [object Object] - дуже інформативно неясно що вони хотіли чим сказати - You should locate four major differences. Помічено 3 непотрібних крапки з комою та менше помилок у консолі. Нічо не зрозуміло й не дуже цікаво. Знайдіть 4 відмінності у коді з різними помилками.
}
//+ JSE2 2.4.4 Inheritance
{
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.position = { latitude, longitude };
      this.status = "unavailable";
    }
    set position({ latitude, longitude }) {
      this.time = Date.now(); // походу цей час також ніде не зберігається
      this.longitude = longitude;
      this.latitude = latitude;
    }
    get position() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  }
  // в оригіналі тут помилка слово Class з великої
  class Bus extends Vehicle {
    constructor({ seats }) {
      super(seats); //* цей рядок додано щоб виправити помилкy ReferenceError
      this.seats = seats;
    }
  }
  // в оригіналі помилка let bus = PassengerVehicle({seats: 40}) - авжеж такого класу не було задекларовано походу це мухомори для креативного кодінгу - Uncaught ReferenceError: PassengerVehicle is not defined
  let bus = new Bus({ seats: 40 });
  console.log(bus.seats); // -> 40
  console.log(bus.id); // -> ! undefined
  //! чим глибше в курс тим міцніше кактуси. У цьому розділі типу написано Let's correct this й приводиться точна копія коду з підписом "It looks a little better". В мене погані новини. Воно виглядає так само.
  //! Спробувала запустити це лайно й авжеж отримала
  //Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  //* після додавання super(seats) в контруктор автобуса вище помилка виправлена
  //? це типу щоб я краще запам'ятала але схоже що після таких пояснень я знаю менше ніж до початку
}
// ор вище неба - о ні там помилка нічо не працює давайте додамо keyword super й далі йде оце
{
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.position = { latitude, longitude };
      this.status = "unavailable";
    }
    set position({ latitude, longitude }) {
      this.time = Date.now(); // походу цей час також ніде не зберігається
      this.longitude = longitude;
      this.latitude = latitude;
    }
    get position() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  }
  class Bus extends Vehicle {
    constructor({ seats, id, latitude, longitude }) {
      super({ id, latitude, longitude });
      this.seats = seats;
    }
  }
  //вангую referrenceError Car is not defined
  //так й відбулося
  let bus = new Car({ seats: 4, longitude: 18.213423, latitude: 59.367628, id: "AL1024" });
  console.log(bus.seats); // -> 4 #брехня
  console.log(bus.id); // -> "AL1024" #брехня
}
// наступна спроба пофіксити ці приклади власноруч
{
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.position = { latitude, longitude };
      this.status = "unavailable";
    }
    set position({ latitude, longitude }) {
      this.time = Date.now(); // походу цей час також ніде не зберігається
      this.longitude = longitude;
      this.latitude = latitude;
    }
    get position() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
  }
  class Bus extends Vehicle {
    constructor({ seats, id, latitude, longitude }) {
      super({ id, latitude, longitude });
      this.seats = seats;
    }
  }
  let bus = new Bus({ seats: 4, longitude: 18.213423, latitude: 59.367628, id: "AL1024" });
  console.log(bus.seats); // -> 4
  console.log(bus.id); // -> "AL1024"
}
//+ JSE2 2.4.2 Shadowing
{
  class AlmostEmptyClass {
    constructor(sth) {
      console.log(sth);
    };
    sayHi() {
      console.log("Hi!")
    };
  };
  class ExtendedClass extends AlmostEmptyClass {
    constructor(name) {
      super("I’m super ...");
      this.name = name;
    };
    sayHi() {
      console.log(`Hi ${this.name}!`);
    };
    newHi() {
      this.sayHi();
    }
    oldHi() {
      super.sayHi();
    };
  };
  let obj = new ExtendedClass("Bob"); // -> I’m super ...
  obj.sayHi();    // -> Hi Bob!
  obj.newHi();    // -> Hi Bob!
  obj.oldHi();    // Hi!
  // на диво тут все ок
}
//+ JSE2 2.4.3 Inheritance from a constructor function
{ //цю функцію пропонується переробити у декларацію класу але най буде так
  let AlmostEmpty = function (sth) {
    console.log(sth);
    this.sayHi = function () {
      console.log("Hi!")
    };
  };
  //In this case, we treat the name of the constructor function as the name of the base class.
  class ExtendedClass extends AlmostEmpty {
    constructor(name) {
      super("I’m super ...");
      this.name = name;
    };
    sayHi() {
      console.log(`Hi ${this.name}!`);
    };
  };
  let obj = new ExtendedClass("Bob");
  obj.sayHi();    // -> Hi Bob!
}
//+ JSE2 2.5 Static members
{
  class AlmostEmptyClass {
    constructor(sth) {
      console.log(sth);
    };
    sayHi() {
      console.log("Hi!")
    };
    static sayHello() {
      console.log("Hello!")
    };
  };
  let almostEmptyObject = new AlmostEmptyClass(120); // 120
  almostEmptyObject.sayHi(); // -> Hi!
  almostEmptyObject.sayHello(); // error: Uncaught TypeError: almostEmptyObject.sayHello is not a function
  AlmostEmptyClass.sayHello(); // -> Hello! #брехня нічо не показує

}
// тут спочатку стверджується що я вважаю це недоцільним а потім мені доводять що ця фіча доцільна, я не можу, з дрижаками чекаю на тест по цьому розділу
{ //в оригіналі коду купа зайвих ";" у декларації класу
  class Vehicle {
    constructor({ id, latitude, longitude }) {
      this.id = id;
      this.status = "unavailable";
      this.setPosition({ latitude, longitude });
    }
    setPosition({ latitude, longitude }) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    }
    getPosition() {
      return {
        latitude: this.latitude,
        longitude: this.longitude
      };
    }
    static isSameId(v1, v2) {
      return v1.id === v2.id;
    }
  }
  // тут в оригіналі помилка в коді - тричі задекларовано vehicle1 хоча там має бути vehicle1,2,3
  let vehicle1 = new Vehicle({ longitude: 18.213423, latitude: 59.367628, id: "AL1024" });
  let vehicle2 = new Vehicle({ longitude: 0, latitude: 0, id: "AL1024" });
  let vehicle3 = new Vehicle({ longitude: 18.213423, latitude: 59.367628, id: "AL1026" });
  // додано console.log() та змінено параметри другого виклику з vehicle1, vehicle2 на 1,3 бо повертає true true якщо нічо не виправити
  console.log(Vehicle.isSameId(vehicle1, vehicle2)); // -> true
  console.log(Vehicle.isSameId(vehicle1, vehicle3)); // -> false
}
{
  //* Статичний метод або властивість можуть бути визначені не тільки в тілі класу з використанням ключового слова static. Це також можна зробити й після декларації класу через те що у JS буквально все окрім примітивів є об'єктами - тобто клас це теж об'єкт
  //десь тут повинна бути декларація класу Vehicle але без методу .isSameId
  Vehicle.isSameId = function (v1, v2) {
    return v1.id === v2.id;
  };
  //чесно кажучи це виглядає як додавання властивості до об'єкту потім після його створення
}
//+ JSE2 2.6 Classes VS constructors
{  //* class
  class TestClass {
    constructor(arg) {
      this.arg = arg;
      console.log(this.arg);
    };

    showSth() {
      console.log("I'm prototyped!");
    };

    static showSth() {
      console.log(`Hi, I'm static!`);
    };
  };
  let test = new TestClass("Hello");
  test.showSth(); // -> I'm prototyped!
  TestClass.showSth(); // -> I'm static!
  console.log(test instanceof TestClass);
}
{//* constructor

  let Test = function (arg) {
    this.arg = arg;
    console.log(this.arg);
  };

  Test.prototype.showSth = function () {
    console.log("I'm prototyped!");
  };

  Test.showSth = function () {
    console.log(`Hi, I'm static!`);
  };
  let test = new Test("Hello");
  test.showSth(); // -> I'm prototyped!
  Test.showSth(); // -> I'm static!
  console.log(test instanceof Test);
}
{//* типу по іншому написаний конструктор - не щоб порівнювати з класом, а як типу треба
  let Test = function (arg) {
    this.arg = arg;
    this.showSth = function () {
      console.log("I'm prototyped!");
    };
    console.log(this.arg);
  };

  Test.showSth = function () {
    console.log(`Hi, I'm static!`);
  };
}
//+ JSE2 2.7.1 Summary and labs
//* дякую за запевнення що класи у джаваскрипті дуже спрощені порівняно з С++ або джавой ще раз щиро дякую (картинка з Шреком)