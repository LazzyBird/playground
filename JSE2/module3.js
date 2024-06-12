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
//+ 3.1.23 Time specification with individual components
{
    let date1 = new Date(2020, 6); //рік рекомендовано у 4циф форматі, місяць нумерується з 0, в цьому й наступному випадку години будуть по 0х, у 3 та 4 - час буде інтерпретовано як локальний
    let date2 = new Date(2020, 6, 8);
    let date3 = new Date(2020, 6, 8, 10);
    let date4 = new Date(2020, 6, 8, 10, 20, 45);
    console.log(date1.toLocaleString()); // -> 01/07/2020, 00:00:00
    console.log(date2.toLocaleString()); // -> 08/07/2020, 00:00:00
    console.log(date3.toLocaleString()); // -> 08/07/2020, 10:00:00
    console.log(date4.toLocaleString()); // -> 08/07/2020, 10:20:45
}
//+ Time specification with date string
{ // тут використовується ISO 8601 формат
    let date1 = new Date("2020-07-08");
    let date2 = new Date("2020-07-08T10:20:00");
    let date3 = new Date("2020-07-08T10:20:00Z");
}
// наступний приклад з викликами Date конструктора з рядками у різніх форматах як аргументи - деякі навмисно неповні. Час завжди інтерпретується як локальний якщо окремо не вказано як в останніх прикладах
{
    let date1 = new Date("Mon Mar 02 2020 10:00:00");
    let date2 = new Date("Mon March 2 2020 10:00");
    let date3 = new Date("Mar 02 2020 10:00:00");
    let date4 = new Date("2 March 2020, 10:");
    let date5 = new Date("3.2.2020");
    let date6 = Date("03/02-2020, 10:00");
    let date7 = new Date("2020, 10:00"); //-> Wed Jan 01 2020 10:00:00 GMT+0200 (Eastern European Standard Time)
    let date8 = new Date("2020 march-02, 10:00");
    let date9 = new Date("3.2.2020 GMT+0400");
    let date10 = new Date("Mon Mar 02 2020 10:00:00 UTC-4");
    // JS робить тут все можливе й неможливе щоб при неповних аргументах повернути дату без помилки
}
//+ 3.1.25 Practical use of a timestamp
{// простий таймер - скільки часу виконується код
    let startTime = Date.now();
    for (i = 0; i < 10000000; i++) { }
    let endTime = Date.now();
    console.log(endTime - startTime);
    //? wtf час виконання різний - gemini каже це норм якщо не критично для аплікації
}
//+ 3.1.26 Operating on individual date and time components
{ // date змінна наслідує методи з коструктора
    let date = new Date("2020-07-08T10:20:00");
    console.log(date.getMonth()); // -> 6 
    console.log(date.getDay()); // -> 3
    console.log(date.getDate()); // 8
    console.log(date.getHours()); // -> 10
    // це з наступного приклада
    console.log(date.toLocaleDateString()); // -> 08/07/2020
    console.log(date.toLocaleTimeString()); // -> 10:20:00
    //
    date.setHours(12);
    console.log(date.getHours()); // -> 12
}
//+ 3.2. Section 2 – Composite data types
{ //створення масиву
    let array1 = []; // -> []
    let array2 = [2, 4, "six"]; // -> [2, 4, "six"]
    let array3 = new Array(); // -> []
    let array4 = new Array(2); // -> [undefined, undefined]
    let array5 = new Array(2, 4, "six"); // -> [2, 4, six]
    let array6 = new Array("2"); // -> ["2"]
    console.log(`array2 : ${typeof array2} : ${array2 instanceof Array} : ${array2.length}`); // -> array2 : object : true : 3
    console.log(`array5 : ${typeof array5} : ${array5 instanceof Array} : ${array5.length}`); // -> array5 : object : true : 3
}
// 3.2.4 merging arrays
{
    let array1 = [10, 20, 30];
    let array2 = ["cat", "dog"];
    let array3 = array1.concat(array2); // -> [10, 20, 30, "cat", "dog"];
    console.log(array1.length); // -> 3
    console.log(array2.length); // -> 2
    console.log(array3.length); // -> 5
    console.log(array3[0]); // -> 10
    console.log(array3[3]); // -> "cat"
}
// 3.2.5 Adding and removing items – push and unshift
{
    let array1 = [10, 20, 30]; // -> [10, 20, 30]
    array1.push(100); // -> [10, 20, 30, 100]
    array1.push(50, "dog"); // -> [10, 20, 30, 100, 50, "dog"]
    array1.unshift("cat", 90, 80); // -> ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"]
    //3.2.6 Adding and removing items – pop and shift
    console.log(array1.length); // -> 9
    console.log(array1.shift()); // -> cat
    console.log(array1.length); // -> 8
    console.log(array1.pop()); // -> dog
    console.log(array1.length); // -> 7
}
//3.2.7 Adding and removing items without using methods
{
    let array1 = [10, 20, 30]; // -> [10, 20, 30]
    array1[3] = 100; // -> [10, 20, 30, 100]
    array1[5] = 1000; // -> [10, 20, 30, 100, undefined, 1000]
    //! delete це не метод конструктора Array - це команда з об'єктів
    delete array1[1]; // -> [10, undefined, 30, 100, undefined, 1000]
    console.log(array1[1]); // -> undefined
}
// 3.2.8 Walking through the array elements
{
    let array1 = ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"];
    for (let index = 0; index < array1.length; index++) {
        console.log(`${index} : ${array1[index]}`); // -> 0 : cat -> 1 : 90 -> 2 : 80 -> 3 : 10 -> 4 : 20 -> 5 : 30 -> 6 : 100 -> 7 : 50 -> 8 : dog
    }
    // спростимо використовуючи функцію
    function toConsole(item, index, array) {
        console.log(`${index} : ${item}`);
    }
    array1.forEach(toConsole); // -> 0 : cat -> 1 : 90 -> 2 : 80 -> 3 : 10 -> 4 : 20 -> 5 : 30 -> 6 : 100 -> 7 : 50 -> 8 : dog
    // ще спростимо - внесемо ф всередину й зробемо її анонімною
    array1.forEach(function (item, index) {
        console.log(`${index} : ${item}`)
    })
    //нічого не зрозуміло дуже цікаво навіщо цей двіж
    array1.forEach((item, index) => console.log(`${index} : ${item}`));
    // походу це повторення того що було в першій частині
    // кажсь хтось забув як дивитися методі - наводиш мишу на метод отримуєш що там й як, не гірше w3school
    // тут дали типу корисну пораду:
    //* Get used to this type of construction.
}
//+ 3.2.9 The every and some methods
{
    let array1 = ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"];
    let anyNumberPresent = array1.some((item) => {
        if (typeof item === "number") {
            return true;
        } else {
            return false;
        }
    });
    console.log(anyNumberPresent) // -> true
    // якщо зминіти на every поверне false
    // умовний оператор там нафіг не упав тому
    anyNumberPresent = array1.some((item) => {
        return (typeof item === "number");
    }); // -> true
    // оператор > повертає булеву тому так само можемо скоротити:
    let array2 = [90, 80, 10, 20, 30, 100, 50];
    let allPositive = array2.every(item => item > 0); // -> true
    console.log(allPositive);
}
//+ 3.2.10 Filtering
{ // я щось робила з фільтром й воно не працювало як треба й було замінено на цикл, згадати б ще що
    let array1 = ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"];
    console.log(array1.length); // -> 9
    let numbers = array1.filter(item => typeof item === "number"); // -> [90, 80, 10, 20, 30, 100, 50]
    console.log(numbers.length); // -> 7
    console.log(array1.length); // -> 9
}
//+ 3.2.11 Mapping elements
{
    let array1 = ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"];
    let squarePower = array1.filter(item => typeof item === "number").map(item => item * item); // -> [8100, 6400, 100, 400, 900, 10000, 2500]
}
//+ 3.2.12 Sorting
{ // цей метод таки незворотньо змінює вихідний масив, тому дивися нижче що робити якщо оригінал ще потрібен
    let array1 = ["cat", 90, 80, 10, 20, 30, 100, 50, "dog"];
    let numbers = array1.filter(item => typeof item === "number"); // -> [90, 80, 10, 20, 30, 100, 50]
    console.log(numbers[0]);
    numbers.sort((first, second) => {
        if (first < second) {
            return -1
        } else if (first == second) {
            return 0;
        } else {
            return 1;
        }
    }); // -> [10, 20, 30, 50, 80, 90, 100]
    console.log(numbers[0]);
    numbers.sort((first, second) => first - second); // ->[10, 20, 30, 50, 80, 90, 100]
    // копія за допомогою slice() без аргументів - тобто початкова й кінцева позиції не зазначені тому від 0 до кінця
    numbers = [12, 10, 15, 50, 81, 1, 15]
    let sortedNumbers = numbers.slice().sort((first, second) => first - second);
    // копія за допомогою оператора розподілу ("spread operator" "...")
    sortedNumbers = [...numbers].sort((a, b) => a - b);
    // одразу щоб не забути про оператор rest 
    const [one, two, ...rest] = numbers;
    console.log(one, two, rest) // -> 12 10 15, 50, 81, 1, 15 - так як я роблю тут деконструкт несортованому масиву то й порядок як і вихідному
}
//+ 3.2.13 Reducing the array
{ // reduce method
    let numbers = [10, 20, 30, 50, 80, 90, 100]; // -> [10, 20, 30, 50, 80, 90, 100]
    let sum = numbers.reduce((accumulator, item) => accumulator + item);
    console.log(sum); // -> 380
    // воно так не працює але типу
    let strangeObj = numbers.reduce((accumulator, item, index) => {
        accumulator[item] = index;
        return accumulator;
    }, {});
    console.log(strangeObj); // -> {10: 0, 20: 1, 30: 2, 50: 3, 80: 4, 90: 5, 100: 6}
}
//+ 3.2.14 Reversing the order of the elements
{ //модифікує вихідний масив
    let numbers = [10, 20, 30, 50, 80, 90, 100]; // -> [10, 20, 30, 50, 80, 90, 100]
    console.log(numbers[0]); // -> 10
    numbers.reverse(); // -> [100, 90, 80, 50, 30, 20, 10]
    console.log(numbers[0]); // -> 100
    numbers.reverse(); // -> [10, 20, 30, 50, 80, 90, 100]
    console.log(numbers[0]); // -> 10
}
//+ 3.2.15 Looking for an element
{
    let myPets = ["cat", "dog", "hamster", "canary", "shark", "cat", "dog"];
    console.log(myPets.includes("shark")); // -> true 
    console.log(myPets.includes("unicorn")); // -> false
    console.log(myPets.indexOf("dog")); // -> 1
    console.log(myPets.lastIndexOf("dog")); // -> 6
    console.log(myPets.indexOf("unicorn")); // -> -1
}
{
    let myPets = ["cat", "dog", "hamster", "canary", "shark", "cat", "dog"];
    console.log(myPets.find(item => item.length > 3)); // -> hamster
    console.log(myPets.find(item => item.includes("og"))); // -> dog
    console.log(myPets.find(item => item.includes("fish"))); // -> undefined
    console.log(myPets.findIndex(item => item.length > 3)); // -> 2
    console.log(myPets.findIndex(item => item.includes("og"))); // -> 1
    console.log(myPets.findIndex(item => item.includes("fish"))); // -> -1
}
//+3.2.16 Copying a selected part of the array
{
    let myPets = ["cat", "dog", "hamster", "canary", "shark", "cat", "dog"];
    let p1 = myPets.slice(3); // ->  ["canary", "shark", "cat", "dog"]
    let p2 = myPets.slice(3, 5); // -> ["canary", "shark"]
    let p3 = myPets.slice(-3); // -> ["shark", "cat", "dog"]
    let p4 = myPets.slice(-3, -1); // -> ["shark", "cat"]
}
//+ 3.2.17 Deleting and replacing a selected part of the array
{
    let myPets = ["cat", "dog", "hamster", "canary", "shark", "cat", "dog"];
    let removedPets = myPets.splice(2, 3);
    console.log(myPets); // -> ["cat", "dog", "cat", "dog"]
    console.log(removedPets); // -> ["hamster", "canary", "shark"]
}
{ //тут splice з 2 індекса видаляє 0 та вставляє те що йде після перших двух параметрів
    let myPets = ["cat", "dog", "hamster", "canary", "shark", "cat", "dog"];
    myPets.splice(2, 0, "rabbit", "guinea pig");
    console.log(myPets); // -> ["cat", "dog", "rabbit", "guinea pig", "hamster", "canary", "shark", "cat", "dog"]
}
//+ 3.2.18 The destructuring assignment
{
    let myPets = ["cat", "dog", "hamster", "canary"]; // 4 elements
    // If we don't want to copy any of the array items, we can mark it by leaving a blank field separated by commas:
    let [pet1, , pet3, pet4] = myPets;
    console.log(pet1); // -> cat
    console.log(pet3); // -> hamster
}
{ // можно задати дефолтні значення для елементів якщо їх не буде знайдено в масиві, але якщо є то ці дефолтні будуть проігноровані
    let myPets = ["cat", "dog"];
    let [pet1 = "fish", , pet3 = "fish"] = myPets;
    console.log(pet1); // -> cat
    console.log(pet3); // -> fish
}
//+ Глибока деструктуризація (явна) об'єкту
{
    const person = {
        name: "John",
        age: 30,
        address: {
            city: "New York",
            zip: "10001"
        },
        hobbies: ["reading", "travelling"]
    };

    const { name, age, address: { city, zip }, hobbies: [firstHobby, secondHobby] } = person;
    // кожна властивість стає змінною з відповідним ім'ям та значенням
    console.log(name);        // "John"
    console.log(age);         // 30
    console.log(city);        // "New York"
    console.log(zip);         // "10001"
    console.log(firstHobby);  // "reading"
    console.log(secondHobby); // "travelling"
}
//+ 3.2.19 The spread operator in arrays
{
    let array1 = [100, 200, 300];
    let array2 = [1000, 2000];
    let array3 = [10, 20, ...array1, 500, ...array2]; //-> [10, 20, 100, 200, 300, 500, 1000, 2000]
}
{ //функція бере робить суму 4х аргументів, тому якщо масив буде довше то в суму потраплять тільки перші 4 елементи
    let testFn = (a, b, c, d) => a + b + c + d;
    let array = [10, 20, 30, 40];
    console.log(testFn(...array)); // -> 100 - красиво обгорнули чорти
}
//+ 3.2.20 Set
{ // цей конструктор бере масив як аргумент та залишає лише унікальні елементи - й створює object Set
    let emptySet = new Set(); // -> {}
    console.log(emptySet.size); // -> 0
    let petsSet = new Set(["cat", "dog", "cat"]); // -> {"cat", "dog"}
    console.log(petsSet.size); // -> 2
}
//+ 3.2.22 Checking the presence of the element
{ //ясно що об'єкт петсет унаслідує методи контруктору Set
    let petsSet = new Set(["cat", "dog"]); // -> {"cat", "dog"}
    console.log(petsSet.has("cat")); // -> true
    console.log(petsSet.has("shark")); // -> false
}
//+ 3.2.23 Handling elements
{
    let petsSet = new Set(["cat", "dog"]); // -> {"cat", "dog"}
    console.log(petsSet.size); // -> 2
    petsSet.add("shark");
    petsSet.add("hamster");
    console.log(petsSet.size); // -> 4
    console.log(petsSet.has("shark")); // -> true
    petsSet.delete("dog"); // -> true
    petsSet.delete("dog"); // -> false
    console.log(petsSet.size); // -> 3
    petsSet.clear();
    console.log(petsSet.size); // -> 0
}
//+ 3.2.24 Walking through the set elements
{ //*forEach
    let petsSet = new Set(["cat", "dog", "hamster"]); // -> {"cat", "dog", "hamster"}
    petsSet.forEach(value => console.log(value)); // -> cat -> dog -> hamster
    petsSet.forEach((value, key) => console.log(`(${value}:${key})`)); // -> (cat:cat) -> (dog:dog) -> (hamster:hamster)
}
{ //* next()
    let petsSet = new Set(["cat", "dog", "hamster"]); // -> {"cat", "dog", "hamster"}
    let petsIterator = petsSet.values();
    console.log(petsIterator.next().value); // -> cat
    console.log(petsIterator.next().value); // -> dog
    console.log(petsIterator.next().value); // -> hamster
    // або через while
    let result = petsIterator.next();
    while (!result.done) {
        console.log(result.value);
        result = petsIterator.next();
    }
}
//+ 3.2.25 The spread operator in sets
{
    let petsSet = new Set(["cat", "dog", "hamster"]); // -> {"cat", "dog", "hamster"}
    console.log(petsSet instanceof Set); // -> true
    let petsArray = [...petsSet]; // -> ["cat", "dog", "hamster"]
    console.log(petsArray instanceof Array); // -> true
}
//TODO розібратися з цим котструктором
//* https://www.geeksforgeeks.org/sets-in-javascript/ 

//+ 3.2.26 Map
