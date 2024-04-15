import { test, expect } from '@playwright/test';
import Env from '@helpers/env';

import Chance from 'chance';
const chance = new Chance();
const email = chance.email();

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "forgot_password");
});
//? незрозуміло що тут перевіряти бо сервер все одно повертає 500 на будь-що
test("fill forgot password form", async ({ page }) => {
    await page.locator('#email').fill(email);
    await page.getByRole('button', { name: 'Retrieve password' }).click();
    await expect(page.locator('body')).toContainText('Internal Server Error');
});
