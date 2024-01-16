import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/drag_and_drop";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test("There are two columns", async ({ page }) => {
    await expect(page.getByRole('banner')).toHaveCount(2);
});

test("the A header is in column a on the load", async ({ page }) => {
    await expect(page.locator("#column-a")).toHaveText("A");
});

test("the B header is in column b on the load", async ({ page }) => {
    await expect(page.locator("#column-b")).toHaveText("B");
})

test("Element A can be drag and dropped to Element B", async ({ page }) => {
    await page.locator('#column-a').dragTo(page.locator('#column-b'));
    expect(await page.locator('#column-b').textContent()).not.toBe('B');
 });

test("Element B can be drag and dropped to Element A", async ({ page }) => {
    await page.locator('#column-b').dragTo(page.locator('#column-a'));
    expect(await page.locator('#column-a').textContent()).not.toBe('A');
 });