import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "floating_menu";

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
});
//TODO меню при прокрутці зникає, але з'являється  - функціонал не страждає. 
test(`menu is floating while scrolling`, async ({ page }) => {
    await page.mouse.wheel(0, 4000)
    await expect(page.locator('#menu')).toBeInViewport();
});