import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingImageURL"
let page, context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});
test.beforeEach(async ({ context }) => {
  page = context.newPage();
})
test.afterAll(async () => {
  await context.close();
});

test("Image has proper position on baseURL (generate referrence images)", async ({ page }) => {
  await page.goto(taskURL.baseURL);
  await expect(page).toHaveScreenshot(`correctPage.png`);
});
test("Image has proper position on random pixels shift", async ({ page }) => {
  await page.goto(taskURL.ramdomPixels);
  await expect(page).toHaveScreenshot(`correctPage.png`);
});
test("Image has proper position on randomBoth", async ({ page }) => {
  await page.goto(taskURL.randomBoth);
  await expect(page).toHaveScreenshot(`correctPage.png`);
});
test("grey avatar is on its place", async ({ page }) => {
  await page.goto(taskURL.simpleAppend);
  await expect(page).toHaveScreenshot(`greyAvatar.png`);
 })