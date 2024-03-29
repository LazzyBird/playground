import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "typos";

let expectedText = `Sometimes you'll see a typo, other times you won't.`;
test(`typo counter`, async ({ page }) => {
  const maxAttempts = 20;
  let typoCount = 0;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await page.goto(taskURL);
    const text = await page.getByText('Sometimes').innerText();
    if (text !== expectedText) {
      typoCount++;
    }
  }
  console.log(`Number of typo appearances: ${typoCount} from ${maxAttempts} attempts`);
  expect(typoCount).toEqual(0);
})
/*
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