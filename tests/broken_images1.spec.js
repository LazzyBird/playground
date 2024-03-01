import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { reportImages, checkImages } from "@datafactory/brokenImagesHelper";
const taskURL = Env.URL + "broken_images";
let page;
//
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

test("Images are loaded properly", async ({ page }) => {
  const brokenImages = await checkImages(page);
  reportImages(brokenImages);
  expect(brokenImages).toEqual([]);
});
