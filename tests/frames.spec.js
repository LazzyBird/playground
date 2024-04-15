import { test, expect } from '@playwright/test';
import Env from '@helpers/env';

const nestedFramesURL = Env.URL + "nested_frames";
const iframeURL = Env.URL + "iframe";
const nestedFrNames = {
    leftFrame: "LEFT",
    middleFrame: "MIDDLE",
    rightFrame: "RIGHT",
    bottomFrame: "BOTTOM"
};
const namesArray = Object.values(nestedFrNames);
//? мама мія хір уі го егейн май май хау кен ай резіст ю
//? що тут перевіряти?
test('Nested Frames all 4 are visible by screenshot', async ({ page }) => {
    await page.goto(nestedFramesURL);
    await page.waitForLoadState();
    await expect(page).toHaveScreenshot();
});
test('nested frames by text', async ({ page }) => {
    
})
//? порівняти з скріншотом? чи треба перевіряти функціонал? там є ще перевірка такого редактора
test(`iFrame with TinyMCE editor`, async ({ page }) => { });