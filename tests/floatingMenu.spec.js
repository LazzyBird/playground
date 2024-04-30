import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "floating_menu";

test.beforeEach(async ({ page }) => {
    await page.goto(taskURL);
});
//TODO меню при прокрутці зникає, але з'являється  - функціонал не страждає.
//? баг настільки тривіальний що от я б на місці девелоперів не стала б возюкатись, коли є купа чого іншого робити
// мені подобається як чатжіпіті це окреслює:Якщо функціональність працює правильно після зникнення меню, то можливо, розглядайте цю проблему як косметичний дефект, який не впливає на коректну роботу сайту
test(`menu is floating while scrolling`, async ({ page }) => {
    await page.mouse.wheel(0, 4000)
    await expect(page.locator('#menu')).toBeInViewport();
});
test('scroll page and check menu visibility', async ({ page }) => {
    const menuLocator = page.locator('#menu');
    const halfScreenHeight = page.viewportSize().height / 2;

    for (let i = 0; i < 30; i++) {
        // Scroll down by half of the screen height
        await page.evaluate(`window.scrollBy(0, ${halfScreenHeight})`);

        // Check if the menu is visible after scrolling
        const isVisible = await menuLocator.isVisible();

        // Assert that the menu is visible
        expect(isVisible).toBeTruthy();

        // Add some waiting time to allow the page to settle (optional)
        await page.waitForTimeout(500);
    }
});
