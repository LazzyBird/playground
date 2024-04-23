import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + "jqueryui/menu");
});
test('click and download pdf', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Enabled' }).click();
    await page.getByRole('link', { name: 'Downloads' }).click();
    await page.getByRole('link', { name: 'PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('menu.pdf')
})