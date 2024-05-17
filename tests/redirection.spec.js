import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + 'redirector';

test.beforeEach(async ({page}) => {
    await page.goto(taskURL);
});

test("Click on the redirector", async ({ page }) => {
    await page.getByText('here').click();
    await page.waitForLoadState('load');
    expect(page.url()).toBe(Env.URL + 'status_codes')
});