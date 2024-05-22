class User {
    constructor({ name, surname, email, role }) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
    }
    addCourse(course, level) {
        //todo
    }
    removeCourse(course) {
        //todo
    }
    editCourse(course, level) {
        //todo
    }
    sendMessage(from, message) {
        //? тут викликається sendEmail(from,to,message)
        //! в описі сказано що параметр повинен бути from але якщо подумати то from при виклику методу повинен брати дані юзера який шле повідомлення, а ось насправді параметром повинно бути to
        //+ є дуже велике бажання скормити цей мотлох якомусь llm щоб перевірило на логіку бо по моєму вона тут не дуже жива
    }
    showMessagesHistory() {
        //todo повинна показати в консоль історію повідомлень які були надіслані юзеру
        //? чи створювати так само як для курсів властивість повідомлення - типу повідомлення(отримане/надіслане, кому/від кого, id, date of creation)
    }
    sendEmail(from, to, message) {
        //? чи тут її декларувати я хз
        //? чи треба створювати у об'єкті user при виклику цього метода властивість messages яка буде зберігати повідомлення - об'єкти з наступними властивостями sendEmail({from, to, message}){ this.time = Date.now(); this.from = from; this.to = to} так щоб time було ідентифікатором, from - власними name and surname юзера, to - ім'ям отримувача
    }
}
//? чи треба тут додавати верифікації параметрів при введенні????? у завданні нічого взагалі про це не йдеться
//! Судячи з коду для тесту рішення це все повинно бути дуже тупо
{//* прикиньмо як повинен виглядати об'єкт юзерь після застосування відповідних методів
    const юзерь = {
        name: 'Tom',
        surname: 'Hanks',
        email: 'some@email.com',
        role: 'teacher',
        messages: [
            {
                id: 1,
                message: 'sometext',
                time: 'sometime',
                from: '!thisUser',
                to: 'Stupid Student'
            },
            {
                id: 2,
                message: 'sometext2',
                from: 'Stupid Student',
                to: '!thisUser'
            }
        ],
        courses: [
            {
                id: 1,
                course: 'math',
                level: 3
            },
            {
                id: 2,
                course: 'biology',
                level: 1
            }
        ]
    }
}
/* Вимоги
Create a User class to create objects for both teachers and students. The constructor should take the user data (name, surname, email, role), but be sure to create the appropriate properties.

Additionally, create the following methods:

- addCourse(course, level) - which will allow you to add course (e.g. math) and level (e.g. 2 - the higher the number, the higher the level); in the case of a student, it will mean that they are looking for help on this level, and in case of a teacher, it will mean that they can help up to this level;
- removeCourse(course) - which will allow you to remove the course (e.g. if the student is no longer interested in learning math)
- editCourse(course, level) - which will allow you to change the level associated with the course;
- sendMessage(from, message) - which will allow you to send a 'message' message from user 'from' to the user described in the object; complete information about the sent message should be stored in the local cache (hint: use an array for this); the sending of the message itself will only be simulated, declare the function sendEmail(from, to, message) {} beforehand and use it in the appropriate place;
- showMessagesHistory() - which will display the history of all messages sent to the user in the console.

//!Test your solution with
let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');
teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);
console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses
teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
teacher1.showMessagesHistory();
//*
-> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: test message
-> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: another message
*/
{ //* sample solution
    function sendEmail(from, to, message) { }

    class User {
        constructor({ name, surname, email, role }) {
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.role = role;
            this.messages = [];
            this.courses = [];
        }

        addCourse(course, level) {
            for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].course === course) {
                    return;
                    //+ перевірка чи є курс у юзера - припиняє роботу якщо знаходить курс з назвою
                }
            }
            this.courses.push({ course, level });
        }

        removeCourse(course) {
            for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].course === course) {
                    this.courses.splice(i, 1);
                    break;
                }
                //+ перебирає масив курсів й робе сплайс якщо назва співпадає
            }
        }

        editCourse(course, level) {
            for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].course === course) {
                    this.courses[i].level = level;
                    break;
                } //+ перебирає всу курси якщо співпадіння змінює значення level
            }
        }

        sendMessage(from, message) {
            this.messages.push({ from: from.email, to: this.email, content: message });
            sendEmail(from.email, this.email, message);
        }

        showMessagesHistory() {
            for (let message of this.messages) {
                console.log(`${message.from} -> ${message.to}: ${message.content}`)
            }
        }
    };
}
{ //* approximative approach solution
    function sendEmail(from, to, message) { // порожня функція яка викликається у методі
    }
    class User {
        constructor(data) {
            this.name = data.name;
            this.surname = data.surname;
            this.email = data.email;
            this.role = data.role;
            this.courses = []; // Список курсів (назва + рівень)
            this.messages = []; // Історія повідомлень
        }
        //+ як параметр контруктора йде одразу об'єкт data
        addCourse(course, level) {
            this.courses.push({ course, level }); //! немає перевірки чи є вже курс
        }

        removeCourse(course) {
            this.courses = this.courses.filter(c => c.course !== course);
        } //+ фільтрує всі курси - зберігає ті які не мають назви вказаної як параметр цього методу

        editCourse(course, level) {
            const existingCourse = this.courses.find(c => c.course === course); //+ шукає курс з заданою назвою й в випадку існування такого змінює значення level
            if (existingCourse) {
                existingCourse.level = level;
            }
        }
        sendMessage(from, message) {
            this.messages.push({ from: from.email, to: this.email, content: message });
            sendEmail(from.email, this.email, message);
        }

        showMessagesHistory() {
            console.log("Історія повідомлень:");
            for (const message of this.messages) {
                console.log(`  - Від: ${message.from}, повідомлення: ${message.message}`);
            }
        }
    }

}