/*
let oneRosePrice;
let oneLilyPrice;
let oneTulipPrice;
let nRoses;
let nLilies;
let nTulips;
oneRosePrice = 8;
oneLilyPrice = 10;
oneTulipPrice = 2;
nRoses = 70;
nLilies = 50;
nTulips = 120;
let totalPriceRoses = nRoses * oneRosePrice;
let totalPriceLilies = nLilies * oneLilyPrice;
let totalPriceTulips = nTulips * oneTulipPrice;
let totalPrice = totalPriceRoses + totalPriceLilies + totalPriceTulips;
console.log(`Rose - unit price:`, oneRosePrice, ` , quantity: `, nRoses, ` , value:`, totalPriceRoses);
console.log(`Lily - unit price:`, oneLilyPrice, ` , quantity:`, nLilies, ` , value:`, totalPriceLilies);
console.log(`Tulip - unit price:`, oneTulipPrice, ` , quantity:`, nTulips, ` , value:`, totalPriceTulips);
console.log(`Total: `, totalPrice);

const oneRosePrice = 8;
const oneLilyPrice = 10;
const oneTulipPrice = 2;
let nRoses;
let nLilies;
let nTulips;
nRoses = 70 - 20;
nLilies = 50 - 30;
nTulips = 120;
let totalPriceRoses = nRoses * oneRosePrice;
let totalPriceLilies = nLilies * oneLilyPrice;
let totalPriceTulips = nTulips * oneTulipPrice;
let totalPrice = totalPriceRoses + totalPriceLilies + totalPriceTulips;
console.log(`Rose - unit price:`, oneRosePrice, ` , quantity: `, nRoses, ` , value:`, totalPriceRoses);
console.log(`Lily - unit price:`, oneLilyPrice, ` , quantity:`, nLilies, ` , value:`, totalPriceLilies);
console.log(`Tulip - unit price:`, oneTulipPrice, ` , quantity:`, nTulips, ` , value:`, totalPriceTulips);
console.log(`Total: `, totalPrice);
*/
const rosePrice = 8;
const lilyPrice = 10;
const tulipPrice = 2;
let numberOfRoses = 70;
let numberOfLilies = 50;
let numberOfTulips = 120;
let rosesValue = rosePrice * numberOfRoses;
let liliesValue = lilyPrice * numberOfLilies;
let tulipsValue = tulipPrice * numberOfTulips;
let total = rosesValue + liliesValue + tulipsValue;
console.log("Rose - unit price:", rosePrice, ", quantity:", numberOfRoses, ", value:", rosesValue);
console.log("Lily - unit price:", lilyPrice, ", quantity:", numberOfLilies, ", value:", liliesValue);
console.log("Tulip - unit price:", tulipPrice, ", quantity:", numberOfTulips, ", value:", tulipsValue);
console.log("Total: ", total);
numberOfRoses = numberOfRoses - 20;
numberOfLilies = numberOfLilies - 30;
rosesValue = rosePrice * numberOfRoses;
liliesValue = lilyPrice * numberOfLilies;
tulipsValue = tulipPrice * numberOfTulips;
total = rosesValue + liliesValue + tulipsValue;
console.log("Rose - unit price:", rosePrice, ", quantity:", numberOfRoses, ", value:", rosesValue);
console.log("Lily - unit price:", lilyPrice, ", quantity:", numberOfLilies, ", value:", liliesValue);
console.log("Tulip - unit price:", tulipPrice, ", quantity:", numberOfTulips, ", value:", tulipsValue);
console.log("Total: ", total);
