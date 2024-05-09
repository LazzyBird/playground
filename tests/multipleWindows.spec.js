import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "windows";

test('2', async ({ page }) => {
    await page.goto(taskURL);
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('text=Click here'),
    ]);
    await newPage.waitForLoadState('load');
    const title = await newPage.title();
    expect(title).toBe('New Window');
    expect(newPage.url()).toBe(taskURL + '/new');
});
