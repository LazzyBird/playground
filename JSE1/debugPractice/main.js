function outer() {
  let name = "outer";
  let str = inner();
  return str;
}

function inner() {
  let name = "inner";
  return "Hello !";
}

console.log("before outer() call");
console.log(outer());
console.log("after outer() call");

//Leibniz: 261.423095703125 ms
// even/odd variant of Leibniz
/*let part = 0;
console.time('Leibniz');
for (let k = 0; k < 10000000; k++) {
    part = part + ((-1) ** k) / (2 * k + 1);
}
console.timeEnd('Leibniz'); // -> Leibniz: 456.60498046875 ms
let pi = part * 4;
console.log(pi); // -> 3.1415925535897915
*/

//Leibniz: 249.820068359375 ms
// power variant of Leibniz:
/*
let part = 0;
console.time('Leibniz');
for (let k = 0; k < 10000000; k++) {
    part = part + ((-1) ** k) / (2 * k + 1);
}
console.timeEnd('Leibniz'); // -> Leibniz: 456.60498046875 ms
let pi = part * 4;
console.log(pi); // -> 3.1415925535897915
*/
/* ex 2
let counter = 0; 
let maxValue = 10; 
let result = 1; 
 
debugger; 
for (counter = 0; counter < maxValue; counter++) { 
    console.log(result); 
    result *= maxValue - counter - 1; 
} 
 
console.log("Final result: ", result);
*/
// ex 3
/*
function max(array) {
    let maxValue = array[1];
    for (let i = 1; ; i) {
        if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    return maxValue;
}
console.log( max([1, 4, 6, 2])); // -> 6 
console.log( max([10, 4, 6, 2])); // -> 6
*/
// correct function from ex 3
/*
function max(array) {
  let maxValue = array[0]; // initial value set to 0 as initial array index
  for (let i = 1; i < array.length; i++) { 
  // corrected for loop parameters
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
}

console.log(max([1, 4, 6, 2])); // -> 6
console.log(max([10, 4, 6, 2])); // -> 10 */
