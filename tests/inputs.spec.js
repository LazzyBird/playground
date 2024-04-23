import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { randomUpDownKeys } from "@monkeys/inputClicker"
import { faceToKeyboardString } from "@datafactory/input"
import Chance from "chance";
const chance = new Chance;

//* це поле приймає цифри, -, e/E, але чомусь у абсолютно рандомному порядку - може прийняти 65465156498--6165120235498Ee654987097 я хз чи так воно повинно бути взагали.

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'inputs')
});

test('input field has type number', async ({ page }) => {
    //* цей тест провалюється тількі по таймауту завантаження, на повторних спробах все ок
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
    test('fill with random string', async ({ page }) => {
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