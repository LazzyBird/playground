//+ 3.0.1 Built-in objects
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
    almostEmptyObject.sayHello(); // error Uncaught TypeError: almostEmptyObject.sayHello is not a function
    AlmostEmptyClass.sayHello(); // -> Hello! - #брехня бо нічого не пише
}