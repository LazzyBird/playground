import { test, expect } from "@playwright/test";
const taskURL =
  "https://the-internet.herokuapp.com/typos";

  let expectedText = `Sometimes you'll see a typo, other times you won't.`

test("Typo check", async ({ page }) => {
  await page.goto(taskURL);
  await expect(page.getByText('Sometimes')).toContainText(expectedText);
})