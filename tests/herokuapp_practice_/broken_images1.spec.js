const { test, expect } = require('@playwright/test');

const taskURL = "https://the-internet.herokuapp.com/broken_images";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState('load');
});

test('are all images loaded properly', async({ page }) => {
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const brokenImagesList = [];

    for (const image of images) {
      if (!image.complete || image.naturalWidth === 0) {
        brokenImagesList.push(image.src);
      }
    }

    return brokenImagesList;
  });

  if (brokenImages.length > 0) {
    console.log(`Total of broken images: ${brokenImages.length}`);
    console.log(`Broken images:`);
    for (const src of brokenImages) {
      console.log(src);
    }
  } else {
    console.log("All images loaded properly.");
  }

  expect(brokenImages).toEqual([]);
    // Return a custom result object
    const testResult = {
        totalImages: brokenImages.length,
        brokenImages,
      };
    
      return testResult;
    
});
