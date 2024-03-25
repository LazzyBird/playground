import { test, expect } from "@playwright/test";
import Env from "@helpers/env"
const taskURL = Env.URL +
  "shifting_content/image?mode=random&pixel_shift=100";
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

test("Image has proper position", async ({ page }) => {
  await expect(page.locator("#content > div")).toHaveScreenshot('img1.png');
});
