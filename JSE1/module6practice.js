// Ex 1
function div(a, b) {
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}
/*
console.log(div(5, 10));
console.log(div(5, 0));
*/

// Ex 2
let numbers = [10, 40, 0, 20, 50];
for (number of numbers) {
  try {
    result = div(1000, number);
  } catch (error) {
    result = error.message;
  }
  console.log(result);
}

// Ex 3
