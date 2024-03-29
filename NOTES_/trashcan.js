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

/* //! тест на одруки - можна адаптувати для А/В тестування - скільки разів показується альтернативні елементи 
test("Typo check", async ({ page }) => {
  await page.goto(taskURL);
  const text = await page.getByText('Sometimes').innerText();
  console.info(text);
  
  /* //? Варіант з рекурсією красивий але не спроацював, логіка не та
    // Функція для перевірки тексту та її повторного виклику в разі неуспішності
    const checkTypo = async ({ page }) => {
      expect(page.getByText('Sometimes')).toContainText(expectedText);
    };
  
    // Функція для повторного виконання перевірки з обмеженою кількістю спроб
    const retryCheckTypo = async () => {
      try {
        await checkTypo();
      } catch (error) {
        console.error("Error occurred:", error);
        console.log("Retrying...");
        await page.reload(); // Перезавантаження сторінки перед кожною спробою
        await retryCheckTypo(); // Рекурсивний виклик для повторної перевірки
      }
    };
  
    await retryCheckTypo(); // Почати перевірку та повторювати в разі неуспішності
}); */