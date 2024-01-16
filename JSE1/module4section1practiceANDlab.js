/*
//else ... if conditional with logical operators combined
const INSURANCE_COST = 2.99;

let shippingCost = 9.99;
let isOrderValid = true;

let userAge = 22;
let points = 400;
let cartValue = 199;
let hasPromoCode = false;
let hasParentsApproval = false;
let addInsurance = true;

//  calculate shipping cost
if (userAge > 65 || (userAge >= 21 && (hasPromoCode || cartValue > 300 || points > 500))) {
  shippingCost = 0;
} else if (userAge < 21 && hasParentsApproval) {
  shippingCost = shippingCost - 5;
} else if (userAge < 21) {
  isOrderValid = false;
}

// take account of insurance
if (isOrderValid && addInsurance && !hasPromoCode) {
  shippingCost += INSURANCE_COST;
}

// show message
if (isOrderValid) {
  console.log(shippingCost);
} else {
  console.log("Cannot order if under 21");
}
// switch .. case
let gate = prompt("Choose gate: a, b, or c");
let win = false;

switch (gate) {
  case "a":
    alert("Gate A: empty");
    break;
  case "b":
    alert("Gate B: main prize");
    win = true;
    break;
  case "c":
    alert("Gate C: empty");
    break;
  default:
    alert("No gate " + String(gate));
}

if (win) {
  alert("Winner!");
}
// Practice Ex.1
let x = prompt("Enter x");
if (x > 90 && x < 110) {
  alert("bingo!");
} else {
  alert("Miss");
};
// Ex.2  ternary op variation
let y = prompt("Enter y");
y > 90 && y < 110 ? alert("bingo!") : alert("Miss");

// Ex.3 simple calculation app
let operand1 = prompt("Enter operand1");
let operand2 = prompt("Enter operand2");
let operator = prompt("Enter operator(+, -, *, /)");
if (Number.isNaN(Number(operand1)) || Number.isNaN(Number(operand2))) {
  alert("Invalid input");
} else {
  switch (operator) {
    case "+":
      alert(Number(operand1) + Number(operand2));
      break;
    case "-":
      alert(Number(operand1) - Number(operand2));
      break;
    case "*":
      alert(Number(operand1) * Number(operand2));
      break;
    case "/":
      alert(Number(operand1) / Number(operand2));
      break;
    default:
      alert("Invalid operator");
  }
} */
// Lab module4section1
let contacts = [
  {
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk",
  },
  {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com",
  },
  {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu",
  },
];
let choice1 = confirm("Do you want to select a contact(OK button) or add a new one (Cancel button)?");
if (choice1) {
  let choice2 = confirm("Do you want 1st contact(OK button) or 3rd contact(Cancel button)?");
  if (choice2) {
    console.log(contacts[0].name, contacts[0].phone, contacts[0].email);
  } else {
    console.log(contacts[2].name, contacts[2].phone, contacts[2].email);
  }
} else {
  let name = prompt("Enter name");
  let phone = prompt("Enter phone");
  let email = prompt("Enter email");
  if (!name || !phone || !email) {
    alert("One of contact fields is empty");
    return;
  } else {
    contacts.push({
      name: name,
      phone: phone,
      email: email,
    });
    console.log(
      contacts[contacts.length - 1].name,
      contacts[contacts.length - 1].phone,
      contacts[contacts.length - 1].email
    );
  }
}
