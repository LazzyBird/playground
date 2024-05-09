import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { dataRef } from "@datafactory/challengingDOM_helperDataGen";
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'large');
});
// тут все гамузом, весь тектсовий контент діва порівнюється зі згенерованим масивом
test('siblings', async ({ page }) => {
    const ref = dataRef(50, 3);
    const siblings = await page.locator('#siblings').allInnerTexts();
    const cleanedData = siblings.join('\n').split('\n').filter(item => item !== '');
    expect(cleanedData).toEqual(ref);
});
// так само весь контент сторінки порівнюється з згенерованим масивом
test('table', async ({ page }) => {
    const ref = dataRef(50, 50);
    const a = await page.locator('td').allInnerTexts();
    expect(a.length).toBe(ref.length);
    expect(a).toEqual(ref);
});
test('every sibling is visible', async ({ page }) => {
    const ref = dataRef(50, 3);
    for (let item of ref) {
        const locator = page.locator('#siblings').filter({ hasText: item });
        await locator.scrollIntoViewIfNeeded();
        await expect(locator).toBeInViewport();
    }
});
