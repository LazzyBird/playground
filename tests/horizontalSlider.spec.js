import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "horizontal_slider")
})
test('Keyboard check - both directional', async ({ page }) => {
    await page.getByRole('slider').focus();
    for (let i = 0.5; i <= 5; i = i + 0.5) {
        await page.keyboard.press('ArrowRight');
        await expect(page.getByText(i)).toBeVisible();
    };
    for (let i = 4.5; i >= 0; i = i - 0.5) {
        await page.keyboard.press('ArrowLeft');
        await expect(page.getByText(i)).toBeVisible();
    }
});
test('Check with fill method and screenshot comparison', async ({ page }) => {
    await page.getByRole('slider').fill('5');
    await expect(page.getByText('5')).toBeVisible();
    await expect(page.getByRole('slider')).toHaveScreenshot();
})