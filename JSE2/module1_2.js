// object console and its method log
let x = 1;
console.log(typeof console); // -> object
console.log(typeof console.log); // -> function
console.log(typeof x); // -> number
console.log(typeof typeof x); // -> string

//properties of classless objects
// expample of calling unexistent property
let contact = {
  tel: "207-662-5412",
  email: "RonaldSMurphy@freepost.org",
};
contact.firstName = "Ronald";
contact.lastName = "Murphy";
/*
console.log(contact.tel);   // -> 207-662-5412
console.log(contact.firstName);     // -> Ronald
console.log(contact.notes); // -> undefined
*/
contact.email = {
  private: "RonaldSMurphy@freepost.org",
  work: "rsmurphy@briazz.com",
};
console.log(contact.email.work);// -> srting

//