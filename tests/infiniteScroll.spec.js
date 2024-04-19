import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'infinite_scroll')
});

test('With .scrollIntoViewIfNeeded method', async ({ page }) => {
    let pCountStart = await page.locator(`.jscroll-added`).count();
    let pCount;
    let n = 100;
    let i = n;
    while (i > 0) {
        pCount = await page.locator(`.jscroll-added`).count();
        await page.locator(`.jscroll-added`).last().scrollIntoViewIfNeeded();
        i--;
    };
    console.log('Total screen scrolls: ', pCount, ' from ', n, ' scroll to view actions, start n of added content units: ', pCountStart)
    expect(pCount).toBeGreaterThan(pCountStart);
});

test('With End button', async ({ page }) => {
    let pCountStart = await page.locator(`.jscroll-added`).count();
    let pCount;
    let n = 50;
    let i = n;
    while (i > 0) {
        await page.keyboard.press('End');
        await page.waitForTimeout(320);
        pCount = await page.locator(`.jscroll-added`).count();
        i--;
    };
    console.log('Total screen scrolls: ', pCount, ' from ', n, ' End button presses, start n of added content units: ', pCountStart);
    // expect(pCount).toBeLessThanOrEqual(n);
    expect(pCount).toBeGreaterThan(n / 2);
});

test('With PgDown button', async ({ page }) => {
    let pCountStart = await page.locator(`.jscroll-added`).count();
    let pCount;
    let n = 50;
    let i = n;
    while (i > 0) {
        await page.keyboard.press('PageDown');
        pCount = await page.locator(`.jscroll-added`).count();
        console.info(pCount);
        i--;
    };
    console.log('Total screen scrolls: ', pCount, ' from ', n, ' End button presses, start n of added content units: ', pCountStart)
    expect(pCount).toBeGreaterThan(pCountStart);
});
test('With wheel emulation', async ({ page }) => {
    let pCountStart = await page.locator(`.jscroll-added`).count();
    let pCount;
    let n = 50;
    let i = n;
    while (i > 0) {
        await page.mouse.wheel(0, 900);
        await page.waitForTimeout(300);
        pCount = await page.locator(`.jscroll-added`).count();
        i--;
    };
    console.log('Total screen scrolls: ', pCount, ' from ', n, ' wholescreen mousewheel scrolls, start n of added content units: ', pCountStart)
    expect(pCount).toEqual(n - 1);
});