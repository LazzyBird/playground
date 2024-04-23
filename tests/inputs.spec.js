import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { randomUpDownKeys } from "@monkeys/inputClicker"
import Chance from "chance";
import exp from "constants";
const chance = new Chance;
//* це поле приймає цифри, -, e/E, але чомусь у абсолютно рандомному порядку - може прийняти 65465156498--6165120235498Ee654987097 я хз чи так воно повинно бути взагали.
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'inputs')
});
test('input field has type number', async ({ page }) => {
    const a = await page.locator('input').getAttribute('type');
    expect(a).toBe('number');
});
test.describe('fill form with different inputs', async () => {
    test('fill with random integer - input equality', async ({ page }) => {
        const a = chance.integer();
        await page.locator('input').fill(a.toString());
        const b = await page.locator('input').inputValue();
        expect(parseInt(b)).toEqual(a);
    });
    test('fill with random floating', async ({ page }) => {
        const a = chance.floating();
        await page.locator('input').fill(a.toString());
        const b = await page.locator('input').inputValue();
        expect(parseFloat(b)).toEqual(a);
    });
    test('fill with letters', async ({ page }) => {
        const a = faceToKeyboardString(30);
        await page.locator('input').pressSequentially(a.face);
        const b = await page.locator('input').inputValue();
        expect(b.toUpperCase()).toEqual(a.cleanedInput);
        console.info(a.face, a.cleanedInput, b)
    })
});

test.describe('change with arrow buttons', async () => {
    test('up and down arrow buttons', async ({ page }) => {
        const expectedResult = await randomUpDownKeys(page, 'input', 700, 'ArrowUp', 'ArrowDown');
        const actualResult = await page.locator('input').inputValue();
        console.log(`Expected result: ${expectedResult}\nActual result: ${actualResult}`);
        expect(parseInt(actualResult)).toEqual(expectedResult);
    })
});
function faceToKeyboardString(maxLength) {
    const face = chance.string({ alpha: true, symbols: true, numeric: true, length: chance.natural({ min: 10, max: maxLength }) });
    const cleanedInput = cleanString(face);
    return { face, cleanedInput };
}
function cleanString(str) {
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
            result += 'E';
            exp = true;
        } else if (/[0-9]/.test(char)) {
            result += char;
        }
    }

    return result;
}