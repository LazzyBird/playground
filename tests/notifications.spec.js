import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { notifications } from "@data_assets/notification";
import * as notification from "@helpers/notification";
const taskURL = Env.URL + "notification_message_rendered";
test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
    await page.getByRole('link', { name: 'Click here' }).click();
});
test('Message appears and can be closed', async ({ page }) => {
    await expect(page.locator('#flash')).toBeVisible();
    await page.getByRole('link', { name: '×' }).click();
    await expect(page.locator('#flash')).not.toBeVisible();
});
test('Message text is correct', async ({ page }) => {
    const text = await page.locator('#flash').filter('#text').innerText();
    const cleanText = notification.cleanText(text);
    const isTextRight = notification.checkNotificationText(cleanText, notifications);
    expect(isTextRight).toBe(true);
});
