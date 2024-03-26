import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingImageURL"
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test("Image has proper position on baseURL (generate referrence images)", async ({ page }) => {
  await page.goto(taskURL.baseURL);
  await expect(page).toHaveScreenshot(`correctPage.png`);
});
test("Image has proper position on random pixels shift", async ({ page }) => {
  await page.goto(taskURL.ramdomPixels);
  await page.waitForLoadState('load');
  await expect(page).toHaveScreenshot(`correctPage.png`);
});
test("Image has proper position on randomBoth", async ({ page }) => {
  await page.goto(taskURL.randomBoth);
  await page.waitForLoadState('load');
  await expect(page).toHaveScreenshot(`correctPage.png`);
});