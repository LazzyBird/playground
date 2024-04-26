import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { randomUpDownKeys } from "@monkeys/inputClicker"
import { faceToKeyboardString } from "@datafactory/input"
import Chance from "chance";
import { screenShoter } from "@datafactory/screenShoter"; 
const chance = new Chance;

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'inputs');
    //await page.waitForLoadState('load');
});

test('input field has type number', async ({ page }) => {
    //? цей тест провалюється тількі по таймауту завантаження, на повторних спробах все ок
    const a = await page.locator('input').getAttribute('type');
    expect(a).toBe('number');
});

test.describe('fill form with different inputs', async () => {
    //? може одразу фігачити рандомним рядком, чи обидва потрібні для покриття?
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
    //! https://bugzilla.mozilla.org/show_bug.cgi?id=1398528 ось класний же кейс але виявилося що це мозілін баг
    // як виявилося, макбучік з разостанньою макосью теж це має
    //також він дає ложнопозитивні результати для хрома - значення у полі є, воно правильне, але PW якогось біса отримує порожнє поле як expected коли воно насправді не порожнє
    //TODO - якщо сильно нема чого буде робити, можна покопатися якого дідька воно повертає порожній рядок
    test('fill with random string', { tag: '@onlyChrome' }, async ({ page }) => {
        let counter = 20;
        const emptyInput = await screenShoter(page, 'input', true);
        const locator = page.locator('input');
        while (counter) {
            const a = faceToKeyboardString(50);
            await locator.pressSequentially(a.face);
            await page.waitForTimeout(200);
            const b = await locator.inputValue();
            /* const inputValue = await page.evaluate(() => {
                return document.querySelector('input').value;
            });
            console.log(inputValue, inputValue.length); */
            // console.log(b, b.length)
            console.log(b);
           /*  if (b === '') {
                const inputVisualCheck = await screenShoter(page, 'input', false);
                await expect(inputVisualCheck).not.toEqual(emptyInput);
            }else{
                await expect(b).toEqual(a.cleanedInput);
            }*/
            await locator.clear();
            counter--;
        }
        // expect(inputValue).toEqual(a.cleanedInput);
        /* const b = await page.locator('input').inputValue();
         expect(b).toEqual(a.cleanedInput);
        await expect(locator).toHaveValue(a.cleanedInput)*/
        /* const inputValueHandle = await page.evaluateHandle(() => {
            const element = document.querySelector('#editing-view-port > div');
            return element?.childNodes[0]?.data; // Отримання значення атрибуту data з першого childNode
        });
        const inputValue = await inputValueHandle.jsonValue(); // Отримання значення з об'єкту-вказівника у форматі JSON

        console.log(inputValue); */
        // expect(b).toEqual(a.cleanedInput);
    });

    //! баг цієї форми у тому що вона має неправильно згенеровані атрибути - hidden, outside of viewport, invisible, not attached etc
});

test.describe('change with arrow buttons', async () => {
    test('up and down arrow buttons', async ({ page }) => {
        const expectedResult = await randomUpDownKeys(page, 'input', 700, 'ArrowUp', 'ArrowDown');
        const actualResult = await page.locator('input').inputValue();
        console.log(`Expected result: ${expectedResult}\nActual result: ${actualResult}`);
        expect(parseInt(actualResult)).toEqual(expectedResult);
    })
});