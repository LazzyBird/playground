import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "horizontal_slider")
})
test('Mouse check', async ({ page }) => {
    await page.locator('#thumb').click();
    await page.keyboard.press('ArrowRight')
    expect(page.getByText('1')).toBeVisible();
});