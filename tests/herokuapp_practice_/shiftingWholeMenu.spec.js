const { test, expect } = require("@playwright/test");

const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=100";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});

test.afterEach(async ({ page }) => {
  await page.reload("load");
});
test.afterAll(async () => {
  await page.close();
  await browser.close();
});

test("Menu is according to layout", async ({ page }) => {
  await expect(page.locator("#content > div > ul").first()).toHaveScreenshot();
});