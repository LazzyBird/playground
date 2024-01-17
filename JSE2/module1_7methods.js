// declaration of methods
{
  let circle = {
    radius: 100,
    center: {
      x: 0,
      y: 0
    },
    getType: function () {
      return "circle";
    }
  };
}
// or in the other way
{
  let circle = {
    radius: 100,
    center: {
      x: 0,
      y: 0
    },
    getType() {
      return "circle";
    }
  };
}
// this method returns string "circle"
{
  console, log(circle.getType()); // -> circle
}
// or with bracket notation
{
  console.log(circle["getType"]()); // -> circle
}
// method can be used to check the properties of its object
{
  let circle = {
    radius: 100,
    center: {
      x: 0,
      y: 0
    },
    getType() {
      return typeof circle.radius === "number" ? "circle" : "unknown";
    }
  };
  console.log(circle.getType()); // -> circle  or if radius was set as "100"(received after inheritance from another object, or as invalid input) -> unknown - here we use typeof and ternary operator
  // BUT AND THIS IS IMPORTANT:
  //
  let figure = { ...circle };
  delete circle.radius;
  console.log(figure.radius);
  console.log(figure.getType()); // "unknown"!
  // we deleted the property radius of the object circle and it is affected porperty of the object figure
  // it  solves by using keyword THIS!!!!
}
// her is corrected code sample
{
  //we can say that this one will always contain a reference to the object we are in. We’ll use it inside the methods to refer to the property of the object in which the method is located
  let circle = {
    radius: 100,
    center: {
      x: 0,
      y: 0
    },
    getType() {
      return typeof this.radius === "number" ? "circle" : "unknown";
    }
  };
  console.log(circle.getType());
  let figure = { ...circle };
  delete circle.radius;
  console.log(figure.radius);
  console.log(figure.getType()); // "circle"
}
