// *? черездупне рішення з bounding box не працює але викинути шкода
/*
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

  const isInsideX = imageX >= divX && (imageX + imageWidth) <= (divX + divWidth);
  const isInsideY = imageY >= divY && (imageY + imageHeight) <= (divY + divHeight);

  return isInsideX && isInsideY;
};

test('Image does not intersect its container bounding box', async ({ page }) => {
  const result = await boundingBoxGetAndCompare(page, taskURL.baseURL, '#content', '#content > div > img');
  expect(result).toBeTruthy();
})*/
