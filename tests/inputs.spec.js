import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import Chance from "chance";
import { InputHandler } from "@helpers/inputHandler";
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
});
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
