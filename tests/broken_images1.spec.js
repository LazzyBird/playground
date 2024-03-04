import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { checkImages, checkImgSrc } from "@datafactory/brokenImagesHelper";
import { generateReportData, reportData } from "@helpers/reportHelper";
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
  const reportDataImages = generateReportData(brokenImages, checkImages);
  reportData(reportDataImages);
  ///expect(brokenImages).toEqual([]);
  // для випадків коли биті зображення відомі, наприклад, 2 битка які зараз неважливі, то можна додати імпорт данних з відомими адресами, або кількістю битків:
  expect(brokenImages.length).toEqual(2);
  // або
  //  expect(brokenImages).toContain("https://the-internet.herokuapp.com/asdf.jpg");
  // expect(brokenImages).toContain("https://the-internet.herokuapp.com/hjkl.jpg");
  // або імпорт з зовнішнього файла
  // importedListOfBrokenImages = ["https://the-internet.herokuapp.com/asdf.jpg", "https://the-internet.herokuapp.com/hjkl.jpg"]
  // expect(brokenImages).toEqual(importedListOfBrokenImages)
});
test("Img.src return !404 response status code", async ({ page }) => {
  const imagesSrc = await checkImgSrc(page);
  expect(imagesSrc.length).toEqual(2);// 2 on purpose because of 2 broken images
  
});
