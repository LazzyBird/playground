import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { randomUpDownKeys } from "@monkeys/inputClicker"
import { faceToKeyboardString } from "@datafactory/input"
import Chance from "chance";
import { screenShoter } from "@datafactory/screenShoter";
const chance = new Chance;

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'inputs');
    await page.waitForLoadState('load');
});

test('input field has type number', async ({ page }) => {
    //? цей тест провалюється тількі по таймауту завантаження, на повторних спробах все ок
    const a = await page.locator('input').getAttribute('type');
    expect(a).toBe('number');
});

test.describe('fill form with different inputs', async () => {
    //оці два взагалі не потрібні, насправді. 
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
});
//! https://bugzilla.mozilla.org/show_bug.cgi?id=1398528 ось класний же кейс але виявилося що це мозілін баг
// як виявилося, макбучік з разостанньою макосью й сафарі теж це має
test('fill with random string', { tag: '@onlyChrome' }, async ({ page }) => {
    // тут проблема в тому що плейрайт десь у 40% випадків просто не бере значення value з цього локатора, тому що
    //! текст виводиться не безпосередньо у форму, а у формі shadow root, потім ще два div'a, потім ще один вкладений нод;
    // тести становяться нестабильними, й я гадки немаю навіщо було городити так складно цю форму, це що реально є такі розробники?
    let counter = 50, emptyValue = 0, attempts = counter;
    const locator = page.locator('input');
    while (counter) {
        const a = faceToKeyboardString(50);
        await locator.pressSequentially(a.face);
        const b = await locator.inputValue();
        if (b === '') {
            emptyValue++;
        }
        await locator.clear();
        counter--;
    };
    const falseFailrate = (emptyValue / attempts) * 100;
    console.log(falseFailrate);
});
test('with screenshot', async ({ page }) => {
    //+ показує що щось в те поле було отримано й вигляд після не такий як до введення
    //! не перевіряє як форма обробляє введення, просто констатує що туди щось потрапило
    //* але 100%
    const emptyInput = await screenShoter(page, 'input', false);
    const a = faceToKeyboardString(50);
    await page.locator('input').pressSequentially(a.face);
    const filledInput = await screenShoter(page, 'input', false);
    expect(filledInput).not.toEqual(emptyInput);
})
test('up and down arrow buttons', async ({ page }) => {
    const expectedResult = await randomUpDownKeys(page, 'input', 700, 'ArrowUp', 'ArrowDown');
    const actualResult = await page.locator('input').inputValue();
    console.log(`Expected result: ${expectedResult}\nActual result: ${actualResult}`);
    expect(parseInt(actualResult)).toEqual(expectedResult);
})