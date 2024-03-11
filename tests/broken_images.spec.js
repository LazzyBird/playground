import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { checkImages, checkImgSrc } from "@datafactory/brokenImagesHelper";
import { putReport } from "@helpers/reportHelper";

const taskURL = Env.URL + "broken_images";
let page;
//
test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  let page = await context.newPage();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});
test.afterAll(async () => {
  await page.close();
});
test("All images are loaded properly", async ({ page }) => {
  const brokenImages = await checkImages(page);
  expect(brokenImages.length).toEqual(0);
  // або якщо треба expect(brokenImages).toEqual(importedListOfBrokenImages)
});
test("Img.src return !404 response status code", async ({ page }) => {
  const imagesSrc = await checkImgSrc(page);
  expect(imagesSrc.length).toEqual(0);
  await putReport(imagesSrc, checkImgSrc);
});
