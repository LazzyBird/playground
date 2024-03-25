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
  try {
    const imageElement = page.locator("#content > div");
    if (!imageElement) {
      throw new Error("Image element not found");
    }
    await expect(imageElement).toHaveScreenshot({
      path: './screenshots/shifting_image.spec.js-snapshots/img1.png'
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
});
