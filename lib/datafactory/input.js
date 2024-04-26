import Chance from "chance";
const chance = new Chance;
export function faceToKeyboardString(maxLength) {
    const face = chance.string({ alpha: true, symbols: true, numeric: true, length: chance.natural({ min: 10, max: maxLength }) });
    const cleanedInput = cleanString(face);
    return { face, cleanedInput };
}
//* функція буквально імітує оббличчям_манекена_по_клавіатурі.гіф
export function cleanString(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string');
    }

    let result = '';
    let minus = false;
    let exp = false;

    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);

        if (char === '-' && !minus && (i === 0 || (i > 0 && (str.charAt(i - 1) !== 'e' && str.charAt(i - 1) !== 'E')))) {
            result += '-';
            minus = true;
        } else if ((char === 'E' || char === 'e') && !exp && (i === 0 || (i > 0 && str.charAt(i - 1) !== '-'))) {
            if (char === 'E') {
                result += 'E';
            } else { result += 'e' }
            exp = true;
        } else if (/[0-9]/.test(char)) {
            result += char;
        }
    }

    return result;
};
