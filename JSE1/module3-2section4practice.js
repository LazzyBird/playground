let dimensions = ["height", "width", "length"];
let result = 1;
let inputInit, volume;
for (let i = -1; i < dimensions.length - 1; i++) {
  typeof parseInt(inputInit) === "number"
    ? (result = result * inputInit)
    : (inputInit = prompt(`Enter ${dimensions[i + 1]}: `, `positive number`));
}
