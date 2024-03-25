import { test, expect } from "@playwright/test";
import Env from "@helpers/env"
const mainURL = Env.URL +
  "shifting_content/image";
const randomShift = mainURL + "?mode=random";
const ramdomPixels = mainURL + "?pixel_shift=100" // ! якщо можна задати зсув у запиті, чому б не додати рандомайзер й функцію для перевірки чи відповідає зсув параметру
const randomBoth = mainURL + "?mode=random&pixel_shift=100";
const simpleAppend = mainURL + "?image_type=simple";

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
//! все не подобається, аж трясе, тупізм якийсь написала
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
