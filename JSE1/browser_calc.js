let firstNumber;
let secondNumber;
let operator;
let result;

let continueLoop = true;

while (continueLoop) {
  firstNumber = prompt("Enter firstNumber or press Q to exit");

  // Check if the user clicked cancel or entered "Q" or "q"
  if (firstNumber === null || firstNumber.toLowerCase() === "q") {
    continueLoop = false;
    break;
  }

  secondNumber = prompt("Enter secondNumber or press Q to exit");

  // Check if the user clicked cancel or entered "Q" or "q"
  if (secondNumber === null || secondNumber.toLowerCase() === "q") {
    continueLoop = false;
    break;
  }

  operator = prompt("Enter operator (+, -, *, /) or press Q to exit");

  // Check if the user clicked cancel or entered "Q" or "q"
  if (operator === null || operator.toLowerCase() === "q") {
    continueLoop = false;
    break;
  }

  if (
    Number.isNaN(Number(firstNumber)) ||
    Number.isNaN(Number(secondNumber)) ||
    (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/")
  ) {
    alert("Invalid input");
  } else {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        alert(result);
        break;
      case "-":
        result = firstNumber - secondNumber;
        alert(result);
        break;
      case "*":
        result = firstNumber * secondNumber;
        alert(result);
        break;
      case "/":
        result = firstNumber / secondNumber;
        alert(result);
        break;
      default:
        alert("Invalid input");
    }
  }
}

alert("Cancelled");
