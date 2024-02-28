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

test("are all images loaded properly?", async ({ page }) => {
  const brokenImages = checkImages(page);
  const result = reportImages(brokenImages);
  expect(brokenImages).toEqual([]);
});
