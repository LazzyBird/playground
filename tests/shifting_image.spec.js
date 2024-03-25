import { test, expect } from "@playwright/test";
import { taskURL } from "@data_assets/shiftingImageURL"
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

async function boundingBoxGetAndCompare(page, url, container, content) {
  await page.goto(url);
  const image = await page.locator(container);
  const div = await page.locator(content);

  const imageBounds = await image.boundingBox();
  const divBounds = await div.boundingBox();

  if (!imageBounds || !divBounds) {
    throw new Error('Bounding box not found');
  }

  const { x: imageX, y: imageY, width: imageWidth, height: imageHeight } = imageBounds;
  const { x: divX, y: divY, width: divWidth, height: divHeight } = divBounds;

  const a = expect(imageX).toBeGreaterThanOrEqual(divX);
  const b = expect(imageY).toBeGreaterThanOrEqual(divY);
  const c = expect(imageX + imageWidth).toBeLessThanOrEqual(divX + divWidth);
  const d = expect(imageY + imageHeight).toBeLessThanOrEqual(divY + divHeight);
  const results = await Promise.all([a, b, c, d]);
  return results.every((res) => res.passed)
};

test('Image does not intersect its container bounding box', async ({ page }) => {
  const result = await boundingBoxGetAndCompare(page, taskURL.ramdomPixels, '#content', '#content > div > img');
  expect(result).toBeTruthy();
})
//! все не подобається, аж трясе, тупізм якийсь написала
/*
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
*/