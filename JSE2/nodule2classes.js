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

}
