const { test, expect } = require("@playwright/test");

const taskURL =
"https://the-internet.herokuapp.com/shifting_content/image?mode=random&pixel_shift=100";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});

test('Image has proper position', async ({ page }) => {
    await expect(page.locator("img.shift")).toBeAttached();
await expect(page.locator("img.shift")).toHaveScreenshot();
})