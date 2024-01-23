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
{ // we create a Figure constructor function 
  let Figure = function () {
    this.getType = function () {
      return this.type ? this.type : "unknown";
    };
  };
  // here figure object is created with keyword new 
  let figure = new Figure();
}
