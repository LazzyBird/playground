import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import Chance from "chance";
//import InputHandler from "@helpers/inputHandler";
const chance = new Chance;

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
    })
});
test.describe('fill and change with arrow buttons', async () => {
    test('only arrow buttons', async ({ page }) => {
        const expectedResult = await randomUpDownKeys(page, 'input');
        const actualResult = await page.locator('input').inputValue();
        console.log(`Expected result: ${expectedResult}\nActual result: ${actualResult}`);
        expect(parseInt(actualResult)).toEqual(expectedResult);
    })
});
async function randomUpDownKeys(page, loc) {
    await page.locator(loc).focus();
    let repeat = chance.integer({ min: 50, max: 500 }), upN = 0, downN = 0, result = 0;
    console.info('N of keypresses: ', repeat);
    while (repeat) {
        const whichKey = chance.bool();
        if (whichKey) {
            await page.keyboard.press('ArrowUp');
            result++;
            upN++;
        } else {
            await page.keyboard.press('ArrowDown');
            result--;
            downN++;
        }
        repeat--;
    };
    const total = upN + downN;
    const difference = upN - downN;
    console.info(`Up pressed ${upN} times, Down pressed ${downN} times, total ${total}, difference ${difference}`);
    return result;
}
/*  //* щось не процює цей клас, треба подумати
test.describe('fill form with different inputs with Class', async ({ page }) => {
    const inputHandler = new InputHandler(page);

    test('fill with random integer - input equality', async () => {
        const inputLocator = 'input';
        const filledValue = await inputHandler.fillWithInteger(inputLocator);
        const fieldValue = await inputHandler.getFieldValue(inputLocator);
        expect(await inputHandler.parseInteger(fieldValue)).toEqual(filledValue);
    });

    // Аналогічно можна викликати інші методи fillWithFloating, fillWithMixed та використовувати відповідні методи parse
});
 */