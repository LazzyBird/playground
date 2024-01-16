const a = false;
const b = true;
const c = false;
const d = true;

console.log((a && b && c) || d); // -> true
console.log(a && b && (c || d)); // -> false

console.log(true && 1991); // -> 1991
console.log(false && 1991); // -> false
console.log(2 && 5); // -> 5
console.log(0 && 5); // -> 0
console.log("Alice" && "Bob"); // -> Bob
console.log("" && "Bob"); // -> empty string

console.log(true || 1991); // -> true
console.log(false || 1991); // -> 1991
console.log(2 || 5); // -> 2
console.log(0 || 5); // -> 5
console.log("Alice" || "Bob"); // -> Alice
console.log("" || "Bob"); // -> Bob
/*
In JavaScript, the logical AND (`&&`) and logical OR (`||`) operators have interesting behavior when dealing with non-boolean operands. Here's how they work:

### Logical AND (`&&`):
1. `console.log(true && 1991);` // -> 1991
   - If the left operand is truthy, it returns the right operand.'
 Example: Only execute the function if the condition is true
const isLoggedIn = true;

isLoggedIn && performLoggedInAction();
In this example, performLoggedInAction() will only be called if isLoggedIn is true.

2. `console.log(false && 1991);` // -> false
   - If the left operand is falsy, it returns the left operand.

3. `console.log(2 && 5);` // -> 5
   - If both operands are truthy, it returns the right operand.

4. `console.log(0 && 5);` // -> 0
   - If the left operand is falsy, it returns the left operand.

5. `console.log("Alice" && "Bob");` // -> Bob
   - If both operands are truthy, it returns the right operand.

6. `console.log("" && "Bob");` // -> empty string
   - If the left operand is falsy, it returns the left operand.

### Logical OR (`||`):
1. `console.log(true || 1991);` // -> true
   - If the left operand is truthy, it returns the left operand.

2. `console.log(false || 1991);` // -> 1991
   - If the left operand is falsy, it returns the right operand.
 Example Using `||` for Default Values:
 Set a default value if the variable is falsy
const username = "";
const displayUsername = username || "Guest";
console.log(displayUsername); // Output: Guest
In this example, if username is a falsy value (like an empty string), the default value "Guest" will be used

3. `console.log(2 || 5);` // -> 2
   - If the left operand is truthy, it returns the left operand.

4. `console.log(0 || 5);` // -> 5
   - If both operands are falsy, it returns the right operand.

5. `console.log("Alice" || "Bob");` // -> Alice
   - If the left operand is truthy, it returns the left operand.

6. `console.log("" || "Bob");` // -> Bob
   - If the left operand is falsy, it returns the right operand.

Understanding this behavior is crucial for using these operators effectively, especially when dealing with default values or conditional expressions. */

// Using `&&' for Guard Clauses
// Example: Avoid executing further code if a condition is not met
function performAction(user) {
  // Guard clause to check if user exists
  if (!user) {
    console.log("User not found");
    return;
  }

  // Continue with the action
  console.log(`Performing action for ${user}`);
}

performAction({ name: "Alice" }); // Output: Performing action for { name: "Alice" }
performAction(); // Output: User not found

// Using `||` for Fallback Values
// Example: Provide a fallback value if a variable is falsy
const userInput = "";
const inputLength = userInput.length || "No input provided";

console.log(inputLength); // Output: No input provided
//

let x = 0;
let y = 0;
console.log(x++ && y++); // -> 0
console.log(x); // -> 1
console.log(y); // -> y == 0

/*
In this snippet, the post-increment (`x++` and `y++`) operators are used in combination with the logical AND (`&&`) operator.

Here's the breakdown:

1. `console.log(x++ && y++); // -> 0`: The logical AND (`&&`) operator evaluates the left operand (`x++`), which has the initial value of `0`. Since `0` is falsy, the entire expression evaluates to `0`. Both `x` and `y` are incremented by the post-increment operation.

2. `console.log(x); // -> 1`: After the first expression, `x` has been incremented to `1` due to the post-increment operation.

3. `console.log(y); // -> y == 0`: The post-increment operation on `y` is delayed until after the logical AND operation. Since the left operand (`x++`) in the logical AND was `0` (falsy), the right operand (`y++`) is not evaluated, and `y` remains `0`.

So, the final outputs are:

- `0` (result of the logical AND operation)
- `1` (value of `x` after increment)
- `0` (value of `y` before increment, as the post-increment was not executed due to short-circuiting) */

{
  //Compound Assignment Operators

  let a = true;
  console.log(a); // -> true
  a &&= false;  // this literally means a = a && false
  console.log(a); // -> false
  let b = false;
  console.log(b); // -> false
  b ||= true; // this literally means b = b || true
  console.log(b); // -> true
}