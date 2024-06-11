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
//+ 3.1.21 time zones and other tricks
// перший приклад не перевіряла, другий весь червоний хехе
{
    let date1 = new Date(0);
    let date2 = new Date(1000 * 60 * 60 * 10);
    console.log(date1.toUTCString()); // -> Thu, 01 Jan 1970 00:00:00 GMT
    console.log(date2.toUTCString()); // -> Thu, 01 Jan 1970 10:00:00 GMT
    console.log(date2.getTimezoneOffset()); // -> 0
    console.log(date2.toLocaleString()); // -> 01/01/1970, 10:00:00
    console.log(date2.toISOString()); // -> 1970-01-01T10:00:00.000Z
    console.log(date2.toUTCString()); // -> Thu, 01 Jan 1970 10:00:00 GMT
    console.log(date2.getTimezoneOffset()); // -> -60
    console.log(date2.toLocaleString()); // -> 01/01/1970, 11:00:00
    console.log(date2.toISOString()); // -> 1970-01-01T10:00:00.000Z
    console.log(date2.toUTCString()); // -> Thu, 01 Jan 1970 10:00:00 GMT
}
{
    date3 = new Date("2020-02-02T20:20:00.000");
    date4 = new Date("2020-02-02T20:20:00.000Z");
    console.log(date3.toLocaleString()); // -> 02/02/2020, 20:20:00 //! 2/2/2020, 8:20:00 PM
    console.log(date3.toISOString()); // -> 2020-02-02T19:20:00.000Z //! 2020-02-02T18:20:00.000Z
    console.log(date3.toUTCString()); // -> Sun, 02 Feb 2020 19:20:00 GMT //! Sun, 02 Feb 2020 18:20:00 GMT
    console.log(date4.toLocaleString()); // -> 02/02/2020, 21:20:00 //! 2/2/2020, 10:20:00 PM
    console.log(date4.toISOString()); // -> 2020-02-02T20:20:00.000Z
    console.log(date4.toUTCString()); // -> Sun, 02 Feb 2020 20:20:00 GMT
    console.log(date3.getTime()); // -> 1580671200000
    console.log(date4.getTime()); // -> 1580674800000
    console.log(date4.getTime() - date3.getTime()); //
}
//+ 3.1.22 current time
{
    let nowObj = new Date();
    console.log(nowObj.toLocaleString());
    // те саме що використати Date.now():
    let now = Date.now();
    console.log(now.toLocaleString());
}
{
    let now = Date.now(); // timestamp
    let nowObj = new Date(now);
    console.log(`now : ${typeof now} : ${now}`); //-> now : number : 1718110330481
    console.log(`now : ${typeof nowObj} : ${nowObj}`); //-> now : object : Tue Jun 11 2024 15:52:10 GMT+0300 (Eastern European Summer Time) - ну той часу який був запущен скрипт
}
