import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'hovers');
});

test('Hover avatar shows text and link', async ({ page }) => {
    const a = await page.locator('.figure').all();
    for (let i = 0; i < a.length; i++) {
        await a[i].hover();
        await expect(page.getByText(`name:`).nth(i)).toBeVisible();
        await expect(page.getByText('user').nth(i)).toBeVisible();
        await expect(page.getByText('View profile').nth(i)).toHaveAttribute('href');
    }
})