// FACTORY FUNCTION - this is not a mechanism of a language but PROGRAMMING PATTERN
{
  let createPoint = function (x, y) {
    let obj = {};
    obj.x = x;
    obj.y = y;
    return obj;
  };
  let point1 = createPoint(1, 1); // declaring the object as a variable which refers to function with given arguments
  let point2 = createPoint(2, 2);
  console.log(point1.x); // ->  1
  console.log(point2.x); // -> 2
}
// simplified version:
{
  let createPoint = function (x, y) {
    return { x: x, y: y };
  };
  let point1 = createPoint(1, 1);
  let point2 = createPoint(2, 2);
  console.log(point1.x); // ->  1
  console.log(point2.x); // -> 2
}
//even more simplified:
{
  let createPoint = function (x, y) {
    return {
      x,
      y
    };
  };
}
// and more: MORE.gif is here
{
  let createPoint = (x, y) => ({ x, y });
}
// Розгорнутий приклад FACTORY FUNCTION
// зараз з'ясуємо що тут відбувається
{
  let createColoredPoint = function (x, y, color) {
    let _info = "... object under construction";
    let _color = color;
    console.log(_info);
    return {
      x,
      y,
      getColor() {
        return _color;
      }
    };
  };
  let coloredPoint1 = createColoredPoint(1, 1, "red"); // -> ... object under construction
  let coloredPoint2 = createColoredPoint(2, 2, "green"); // -> ... object under construction
  console.log(coloredPoint1.getColor()); // -> red
  // object created by a function will exist after function has finished working. JS recognizes the situation and, together with our new object, stores the call environment of the function in which the object was created. Local variables of the function which are used by the methods of the returning object, are NOT deleted. They are stored in the call environment of the function. Each call to a function has its own independent env, just as objects created by factory are independent.
  // This is CLOSURE
  console.log(coloredPoint2.getColor()); // -> green
  console.log(coloredPoint1._color); // -> undefined !!!
  //The local variable _color is not accessible to the outside, but only with getColor method. Threfore, we can treat this as private property.
}

// THE CONSTRUCTOR and the NEW keyword
{
  // Names of constructors traditionally start with a capital letter
  let ColoredPoint = function (x, y, color) {
    let _info = "... object under construction";
    let _color = color;
    console.log(_info);

    this.x = x;
    this.y = y;
    this.getColor = function () {
      return _color;
    };
  };
  let coloredPoint1 = new ColoredPoint(1, 1, "red");
  let coloredPoint2 = new ColoredPoint(2, 2, "green");
  console.log(coloredPoint1.getColor()); // -> red
  console.log(coloredPoint2.getColor()); // -> green
  console.log(coloredPoint1._color); // -> undefined !!!
  console.log(ColoredPoint.constructor.name); //-> in fact returns Function
  console.log(typeof ColoredPoint.constructor); // -> function
}
// when we declare an empty object in JS we in fact use built-in generic constructor, and most objects we create inherit properties grom generic Object constructor object.
{
  let a = {};
  console.log(typeof a.constructor); // -> function
  // the inherired properties are not enumerated with for...in loop, or with Object.keys nor Object.getOwnPropertyNames methods.They are available, we can use them, but they are treated slightly differently from the object's own properties
}

// NEW Object()
{
  let emptyObject = new Object();
  console.log(
    emptyObject.constructor.name // -> Object
  );
  // same effect has
  let anotherEmptyObject = {};
  console.log(anotherEmptyObject.constructor.name);
  // -> Object
  // These objects contain what was been added by the constructor Object
}
// suggested by codeium class declaration instead of constructor
// залишу як є, потім порівняю з відповідним розділом 
{
  class ColoredPoint {
    constructor(x, y, color) {
      let _info = "... object under construction";
      let _color = color;
      console.log(_info);

      this.x = x;
      this.y = y;
      this.getColor = function () {
        return _color;
      };
    }
  }
}

//Object.create() technique
{// here object created without using prototype - we gave null as argument
    let reallyEmptyObject = Object.create(null);
    console.log(
        typeof reallyEmptyObject.constructor
    )//-> undefined
}
/// Unless you are 100% sure why you need an object that is not based on the generic Object constructor, create it in the normal way (factory, constructor, object literals, classes)