{
  let point = { x: 0, y: 0 };
  let coloredPoint = { color: "red" };

  coloredPoint.__proto__ = point;
  // .__proto__ is deprecated - here is for basics of prototyping
  console.log(Object.getOwnPropertyNames(coloredPoint)); //  -> [ "color"]
  console.log(coloredPoint.color); // -> red
  // as there's no x property in coloredPoint, JS will looks for it in prototype, so that is why:
  console.log(coloredPoint.x); // -> 0
}
///again using __proto__ method is only for explanation, it's deprecated
{
  figure = {
    getType: function () {
      return this.type ? this.type : "unknown";
    }
  };
  let circle = {
    type: "circle",
    center: { x: 0, y: 0 },
    radius: 100
  };
  circle.__proto__ = figure;
  console.log(figure.getType()); // -> unknown - figure object has no property "type"
  console.log(circle.getType()); // -> circle - circle object inherited getType function and also has property "type"
}
// Object.setPrototypeOf method
{
  figure = {
    getType: function () {
      return this.type ? this.type : "unknown";
    }
  };
  let circle = {
    type: "circle",
    center: { x: 0, y: 0 },
    radius: 100
  };
  Object.setPrototypeOf(circle, figure);
  let proto = Object.getPrototypeOf(circle); // it's not clear what purpose has this string
  console.log(circle.getType()); //  -> circle
}

/// Object.create - circle object is created on figure as prototype, and inherits getType function, but also has new property added
{
  figure = {
    getType: function () {
      return this.type ? this.type : "unknown";
    }
  };
  let circle = Object.create(figure);
  circle.type = "circle";
  (circle.center = { x: 0, y: 0 }), (circle.radius = 100);
  console.log(circle.getType());
}
// Constructor
{
  // we create a Figure constructor function
  let Figure = function () {
    this.getType = function () {
      return this.type ? this.type : "unknown";
    };
  };

  let figure = new Figure(); // here figure object is created with keyword new from Figure constructor
  let Circle = function (center, radius) {
    // defining Circle constructor
    this.type = "circle";
    this.center = center;
    this.radius = radius;
  };
  Circle.prototype = figure; // figure object is set as prototype of Circle constructor
  let circle1 = new Circle({ x: 0, y: 0 }, 10); // creating circle1 object form Circle constructor
  let circle2 = new Circle({ x: 100, y: 100 }, 100); // same for circle2 object
  let Triangle = function (v1, v2, v3) {
    this.type = "triangle";
    this.vertices = [v1, v2, v3];
  };
  Triangle.prototype = figure;
  let triangle1 = new Triangle(
    { x: 0, y: 0 },
    { x: 50, y: 50 },
    { x: 10, y: 100 }
  );
  console.log(circle1.getType());
  console.log(triangle1.getType());
  Circle.prototype.hi = function () {
    // modifying prototype of Circle constructor - it seems to me that refers to figure object, so "hi" method now is available for all existing objects whose prototype is "figure" object. I.e. circle1, circle2 and triangle objects too.
    console.log("Hi!");
  };
  // so if we call "hi" method to these objects, we'll have:
  circle1.hi();
  triangle1.hi();
  figure.hi();
  // for every case "Hi!" is shown in the console - three times - method "hi" is iheried from "figure"object as prototype
}
/// for examlpe, predefined "String" constructor with many methods and properties:
{
  let testString = new String("unu doi trei");
  console.log(testString.length); // -> 12
  // as String also has the prototype property we can add method there:
  String.prototype.hi = function () {
    console.log("Hi!");
  };
  console.log(testString.hi()); // -> Hi!
  // so method "hi" was added to String constructor - which is predefined. Seems this is a bad practice but this is an example of adding method to it.
  // and if we added that method to predefined constructor, every object created with this proto will have added method:
  console.log("abcd".hi());
// Autoboxing: JavaScript converts the simple type (in this case the string) to the corresponding object (in our case, an object based on the String constructor) as and when necessary. And we indicated, this requires the use of a dot, suggesting that with dot notation we treat the text "abcd" as an object.
}
