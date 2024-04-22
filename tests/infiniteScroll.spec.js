import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

test.beforeEach(async ({ page }) => {
    await page.goto(Env.URL + 'infinite_scroll')
});

//TODO чесно кажучи тут треба було б навести лад, бо виглядає так собі, хоч працює. Div може бути доданий пустим, так що наступний блок тестів якраз про доданий текстовий контент
test.describe('checks based on counting added divs', async () => {
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
            await page.waitForTimeout(320); //* якщо таймаут менше, то починає пропускати натиснення клавіши
            pCount = await page.locator(`.jscroll-added`).count();
            i--;
        };
        console.log('Total screen scrolls: ', pCount, ' from ', n, ' End button presses, start n of added content units: ', pCountStart);
        expect(pCount).toBeLessThanOrEqual(n); //* в ідеалі повинно дорівнювати, але тоді таймаут треба збільшити до 350мс, й не факт що у реальній ситуації сам девайс не почне буксувати
        expect(pCount).toBeGreaterThan(n / 2); //* так що тут очікуваний результат розміщено між 1/2 та 1/1 всіх спроб
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
})
test.describe('based on text content length delta', async () => {
    test('mouse wheel', async ({ page }) => {
        let scrolls = 10;
        let x = await getTextLength(page, 'body');
        let after;
        while (scrolls) {
            const before = await getTextLength(page, 'body');
            console.info(before);
            await page.mouse.wheel(0, 960);
            //! without timeout - 9.5s, with timeout - 12.1s
            // await page.waitForTimeout(170);
            after = await getTextLength(page, 'body');
            console.info(after);
            expect(after).toBeGreaterThanOrEqual(before);
            scrolls--;
        }
        expect(after).toBeGreaterThan(x);
    })
})
async function getTextLength(page, loc) {
    const a = await page.locator(loc).allInnerTexts();
    const b = a.toString();
    return b.length;
}