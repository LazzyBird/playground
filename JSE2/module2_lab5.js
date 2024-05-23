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
class ExtendedUser extends User {
    constructor({ name, surname, email, role }) {
        super({ name, surname, email, role });
    }
    static match(teacher, student, course) {
        let matched = [];
        for (let scourse of student.courses) {
            for (let tcourse of teacher.courses) {
                if (scourse.course === tcourse.course && scourse.level <= tcourse.level) {
                    matched.push(scourse);
                }
            }
        }
        if (course) {
            for (let mcourse of matched) {
                if (mcourse.course === course) {
                    return mcourse;
                }
            }
            return null;
        } else
            return matched;
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
class Teacher extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'teacher' });
    }
}
class Student extends ExtendedUser {
    constructor({ name, surname, email }) {
        super({ name, surname, email, role: 'student' });
    }
}
class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    getStudentByName(name, surname) {
        let retVal;
        for (let student of this.students) {
            if (student.name === name && student.surname === surname) {
                retVal = student;
            }
        }
        return retVal;
    }
    getTeacherByName(name, surname) {
        let retVal;
        for (let teacher of this.teachers) {
            if (teacher.name === name && teacher.surname === surname) {
                retVal = teacher;
            }
        }
        return retVal;
    }
    getStudentsForTeacher(teacher) {
        let result = [];
        for (let student of this.students) {
            if (ExtendedUser.match(teacher, student).length) {
                result.push(student);
            }
        }
        return result;
    }
    getTeacherForStudent(student) {
        let result = [];
        for (let teacher of this.teachers) {
            if (ExtendedUser.match(teacher, student).length) {
                result.push(teacher);
            }
        }
        return result;
    }
    addStudent(name, surname, email) {
        this.students.push(new Student({ name, surname, email }));
    }
    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({ name, surname, email }));
    }
}
class ExtendedTutoring extends Tutoring {
    constructor() {
        super()
    }
    sendMessages(from, to, message) {
        if (from && to.length) {
            for (let target of to) {
                target.sendMessage(from, message);
            }
        }
    }

}
//! challenge code
let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));
tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for (let user of to) {
    user.showMessagesHistory();
}
// -> PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// -> PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message