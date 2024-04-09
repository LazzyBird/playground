import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

const taskURL = Env.URL + "exit_intent";

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
});

test(' Mouse out calls modal', async ({ page }) => {
    await page.mouse.move(200, 200, 0.5);
    await page.mouse.move(200, -200, 0.5);
    await expect(page.getByText('Close')).toBeVisible();
});