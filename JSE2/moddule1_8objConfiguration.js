//Properties configuration
{
  // here we get the properties of object with getOwnPropertyDescriptor method
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
  let keys = Object.keys(contact);
  console.log(keys); // -> ["_age", "firstName", "lastName", "fullName", "age"]
  let desc = Object.getOwnPropertyDescriptor(contact, "firstName");
  console.log(desc); // -> {value: "David", writable: true, enumerable: true, configurable: true}
  let propOfFullName = Object.getOwnPropertyDescriptor(contact, "fullName");
  console.log(propOfFullName); // -> {set: undefined, enumerable: true, configurable: true, get: f}
}
// setting configuration of properties using Object.defineProperty:
//1st example - setting enumerable to false
{
  let contact = {};
  Object.defineProperty(contact, "_age", {
    value: 36,
    writable: true,
    enumerable: false, //calling Object.keys(contact) will not return _age. This is true also for executing for...in - it will not be taken into account. BUT the property exists, and we can check it by displaying its value
    configurable: true
  });
  Object.keys(contact);
  console.log(contact._age);
}
//2nd example - setting writable to false:
{
  Object.defineProperty(contact, "_age", {
    value: contact._age,
    writable: false, // we cannot modify the value so it is protected from changes or deletion with delete command
    enumerable: false,
    configurable: true
  });
  contact._age = 100;
  console.log(contact._age);
}
// if we need to retrieve all fields without paying attention to their configuration we can use Object.getOwnPropertyNames method - it works similarly to Object.keys(but this method works only with enumerable properties):
{
  let contact = {
    _age: 20,
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
  Object.defineProperty(contact, "_age", {
    value: 36,
    writable: true,
    enumerable: false,
    configurable: true
  });
  let enumKeys = Object.keys(contact);
  let allKeys = Object.getOwnPropertyNames(contact);
  console.log(enumKeys); // -> ["firstName", "lastName", "fullName", "age"]
  console.log(allKeys); // -> ["_age", "firstName", "lastName", "fullName", "age"]
}

// OBJECT CONFIGURATION - configuration can be changed at the level of the whole object not only individual properties(descibed above)
// such methods are:
// Object.preventExtensions(object) - prevents adding new properties
// Object.isExtensible(object) - returns true if object is extensible
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
  Object.preventExtensions(contact);
    console.log(Object.isExtensible(contact));// -> false
    contact.test = 100;
    console.log(contact.test);// -> undefined
}
// Object.seal(object) - prevents adding and deleting properties
// Object.isSealed(object) - returns true if object is sealed
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
  Object.seal(contact);
  console.log(Object.isSealed(contact));// -> true
  contact.test = 100;
    console.log(contact.test);// -> undefined
    delete contact._age; // -> false
}
// Object.freeze(object) - prevents adding, deleting and changing properties AND additionally makes it impossible to change the VALUE of existing properties
// Object.isFrozen(object) - returns true if object is frozen
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
  Object.freeze(contact);
  console.log(Object.isFrozen(contact));// -> true
  contact.test = 100;
  console.log(contact.test);// -> undefined
  delete contact._age; // -> false
}