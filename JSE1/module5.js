// Ex 1A sample code
/* let numbers = [50, 10, 40, 30, 20];
function compareNumbers(a, b) {
  let retVal = 0;
  if (a < b) {
    retVal = -1;
  } else if (a > b) {
    retVal = 1;
  }
  return retVal;
}
let sorted = numbers.sort(compareNumbers);
console.log(sorted); // [10, 20, 30, 40, 50]
*/

// Ex 1A anonimous function
/*
let numbers = [50, 10, 40, 30, 20];
let myCompare = function(a, b) {
     let retVal = 0;
     if (a < b) {
         retVal = -1;
     } else if(a > b) {
         retVal = 1;
     }
     return retVal;
}
let sorted = numbers.sort(myCompare);
console.log(sorted); // [10, 20, 30, 40, 50]
*/

// Ex 1A arrow function
/*
let numbers = [50, 10, 40, 30, 20];
let myCompare =  (a, b) => {
  let retVal = 0;
  if (a < b) {
    retVal = -1;
  } else if (a > b) {
    retVal = 1;
  }
  return retVal;
};
let sorted = numbers.sort(myCompare);
console.log(sorted);
*/

// Ex 1A getting rid of "IF" with ternary
let numbers = [50, 10, 40, 30, 20];
let myCompare = (a, b) => {
  return a > b ? -1 : 1; //exchange > to < for reverse order
};
let sorted = numbers.sort(myCompare);
console.log(sorted);

// Ex 1A sample solution - with arrow function as a parameter
let numbers1 = [50, 10, 40, 30, 20];
let sorted1 = numbers1.sort((a, b) => a - b);
console.log(sorted1);

// Ex 2
// I solved it with arrow functions and ternary from the beginningcas Ex 3 task
let add = (a, b) => {
  return Number.isInteger(a) && Number.isInteger(b) ? a + b : NaN;
};
let sub = (a, b) => {
  return Number.isInteger(a) && Number.isInteger(b) ? a - b : NaN;
};
let mult = (a, b) => {
  return Number.isInteger(a) && Number.isInteger(b) ? a * b : NaN;
};
console.log(add(1, 2)); // 3
console.log(sub(1, 2)); // -1
console.log(mult(1, 2.2)); //NaN

// Ex 2 sample solution
// I don't like it, it is longer than mine and it has IF in it
/*
function add(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return NaN;
  }
  return a + b;
}
function sub(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return NaN;
  }
  return a - b;
}
function mult(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return NaN;
  }
  return a * b;
}
*/

//Ex 4
// write action function that will take callback function to
//achive next output
//console.log(action(add, 12, 10)); // -> 22
/* Sample solution
let action = (callback, a, b) => callback(a, b);
// or
let action = function (callback, a, b) {
    return callback(a, b);
}
// or
function action(callback, a, b) {
    return callback(a, b);
}
*/
let action = (callback, a, b) => callback(a, b);
console.log(action(add, 12, 10)); // -> 22
console.log(action(sub, 12, 10)); // -> 2
console.log(action(mult, 12, 10)); // -> 120
console.log(action(add, 12, 11.1)); // NaN
// It's not clear how apply on practice such action function, it is just wrapping parameters. Study purpose?

// Ex 5
// Sample solution
/*
let counter = 1;
let intervalId = setInterval(function () {
    console.log(counter++);
}, 2000);
setTimeout(function () {
    clearInterval(intervalId)
}, 20000);
*/
let n = 1;
let intervalId = setInterval(() => console.log(n++), 2000);
setTimeout(() => clearInterval(intervalId), 20000);

// Ex 6 Fibonacci recursion
// Sample solution
/*
let fibbRec = function (n) {
    let retVal = 0;
    if (n != 0) {
        if (n === 1) {
            retVal = 1;
        } else {
            retVal = fibbRec(n - 1) + fibbRec(n - 2);
        }
    }
    return retVal;
}
*/
// Solution with ternary - Ex 7
function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
console.log(fib(4)); // -> 3
console.log(fib(7)); // -> 13
// Solution with arrow function - Ex 7
let fib1 = (n) => (n < 2 ? n : fib1(n - 1) + fib1(n - 2));
// sample solution with arrow function and doubled ternary for Ex 7
let fibb3 = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibb3(n - 1) + fibb3(n - 2));
console.log(fibb3(4)); // -> 3

// Ex 8
// rewrite Ex 5 to loop FOR - task written unclear - Write an iterative version of the function from Exercise 5 (use the for loop). Declare the function using a function statement. Sample solution is for Fibonacci recursion.
function countLoop(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  } // function to log numbers from 1 to n as in ex 5
}
countLoop(10);
function fiboLoop(n) {
  // calculating Fibonacci sequence and log it with its position in the sequence - return also solutions for 0 - ifn=0, 1 - ifn=1 and for ifn>1
  let a = 0;
  let b = 1;
  for (let i = 0; i <= n; i++) {
    let c = a + b;
    console.log(a, `${i}th`);
    a = b;
    b = c;
  }
}
/*
// Sample solution
function fibbIter(n) {
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let c = a;
        a = b;
        b += c;        
    }
    return b;
}
*/