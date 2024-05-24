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
    almostEmptyObject.sayHello();
    // error Uncaught TypeError: almostEmptyObject.sayHello is not a function
    AlmostEmptyClass.sayHello(); // -> Hello! - буде працювати якщо закоментить рядок що викликає помилку - бо так JS й працює
}
{ //? при запуску коду в пісочниці курсу вилазить рекомендація не використовувати Number в якості конструктора
    let n = new Number(100.123);
    let fixed = n.toFixed(2);
    let test1 = Number.isInteger(100);
    let test2 = n.isInteger(100); // -> n.isInteger is not a function
}