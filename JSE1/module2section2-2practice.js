let boo1 = Boolean(false);
let boo2 = true;
let num1 = Number(11);
let num2 = 12;
let bigInt1 = BigInt(12);
let bigInt2 = 12n;
let str0 = String("Hello");
let str2 = 'Bye';
let var5 = undefined;

console.log(`${boo1} [${typeof boo1}]`);
console.log(`${boo2} [${typeof boo2}]`);
console.log(`${num1} [${typeof num1}]`);
console.log(`${num2} [${typeof num2}]`);
console.log(`${bigInt1} [${typeof bigInt1}]`);
console.log(`${bigInt2} [${typeof bigInt2}]`);
console.log(`${str0} [${typeof str0}]`);
console.log(`${str2} [${typeof str2}]`);
console.log(`${var5} [${typeof var5}]`);

let chainConv = Boolean(BigInt(Number("1234")));
console.log(`${chainConv} [${typeof chainConv}]`);

let booSum = boo1 + boo2;
console.log(`${booSum} [${typeof booSum}]`);
let numSum = num1 + num2;
console.log(`${numSum} [${typeof numSum}]`);
let bigIntSum = bigInt1 + bigInt2;
console.log(`${bigIntSum} [${typeof bigIntSum}]`);
let strSum = str0 + str2;
console.log(`${strSum} [${typeof strSum}]`);
let boonum = boo1 + num1;
console.log(`${boonum} [${typeof boonum}]`);
let boobig = boo1 + bigInt1;
console.log(`${boobig} [${typeof boobig}]`);
let boostr = boo1 + str0;
console.log(`${boostr} [${typeof boostr}]`);

const str3 = 42 + "1";
console.log(`${str3} [${typeof str3}]`);
