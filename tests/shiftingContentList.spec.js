import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { screenShoter } from "@datafactory/screenShoter";
const loc = '#content > div > div'
const listItems = [
    `Important Information You're Looking For`,
    `Et numquam et aliquam.`,
    `Vel aliquid dolores veniam enim nesciunt libero quaerat.`,
    `Sed deleniti blanditiis odio laudantium.`,
    `Nesciunt autem eum odit fuga tempora deleniti.`
];
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'shifting_content/list')
});
test('first static text appears', async ({ page }) => {
    for (let i = 0; i < listItems.length; i++) {
        expect(page.getByText(listItems[i])).toBeVisible();
    };
});
test('list compare by screenshot', async ({ page }) => {
    const before = await screenShoter(page, loc, false);
    await page.reload();
    const after = await screenShoter(page, loc, false);
    expect(after).not.toEqual(before);
});

