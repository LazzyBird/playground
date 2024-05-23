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
        const existingCourse = this.courses.find(c => c.course === course);
        if (!existingCourse) {
            this.courses.push({ course, level });
        } else {
            if (level > existingCourse.level) {
                existingCourse.level = level;
            }
        }
    }
    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }
    editCourse(course, level) {
        const existingCourse = this.courses.find(c => c.course === course);
        if (existingCourse) {
            existingCourse.level = level;
        }
    }
    sendMessage(from, message) {
        this.messages.push({ from: from.email, to: this.email, content: message });
        sendEmail(from.email, this.email, message)
    }
    showMessagesHistory() {
        for (let message of this.messages) {
            console.log(`${message.from} wrote to ${message.to}: ${message.content}`)
        }
    }

}
function sendEmail(from, to, message) {
    // порожня болванка як по вимогах
}
class ExtendUser extends User {
    constructor({ name, surname, email, role }) {
        super({ name, surname, email, role });
    }
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    set fullName(fullName) {
        let names = fullName.split(' ');
        if (names[0] && names[1]) {
            this.name = names[0];
            this.surname = names[1];
        }
    }
}
class Teacher extends ExtendUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'teacher' });
    }
}
class Student extends ExtendUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'student' });
    }
}
// challenge code
let student1 = new Student({ name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com' });
let student2 = new Student({ name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com' });
let teacher1 = new Teacher({ name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com' });

student1.addCourse('maths', 2);
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
student1.fullName = 'Rafael Fifer'; //* тут змінюється прізвище
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses