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
// here is corrected code sample
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
// THIS inside nested objects
{
  // here is ambiguity of defining parent object - parent would be both test and circle. Logically this is not feasible.!!!!
  let circle = {
    radius: 100,
    center: {
      x: 0,
      y: 0,
      show() {
        console.log(`${this.x}, ${this.y}`);
      }
    }
  };
  circle.center.show();
  let test = {
    point: circle.center
  };
}

// GETTER AND SETTER
{
  let contact = {
    _tel: "207-662-5412",
    get tel() {
      return this._tel;
    }
  };
  console.log(contact.tel);
  contact.tel = "100-100-1000"; //it will fail because setter is not defined in the object, and JS will not allow us to create a new property with this name
  console.log(contact.tel);
  contact.email = "RonaldSMurphy@freepost.org"; // but this will work, because there is no such propertie in the object, and no setter of getter attached to it
  console.log(contact.email);
}
// here with get and set we can write in _tel field:
{
  let contact = {
    _tel: "207-662-5412",
    get tel() {
      return this._tel;
    },
    set tel(t) {
      this._tel = t;
    }
  };
  console.log(contact.tel);
  contact.tel = "100-100-1000";
  console.log(contact.tel);
}
//Setter and getter methods can perform much more complex actions than just operations on a single property. They are often used to create fake fields that are, for example, aggregated from the values of several real fields, modified on the fly, validated, etc.
{
  let contact = {
    _age: 36,
    firstName: "David",
    lastName: "Taylor",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    get age() {
      return this._age;
    },
    set age(a) {
      if (a > 0) this._age = a;
    }
  };
  console.log(contact.fullName);
  contact.age = -20;
  console.log(contact.age);// set contains validation so it will not allow to set negative age
}
