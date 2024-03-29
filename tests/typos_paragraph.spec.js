import { test, expect } from "@playwright/test";
import { typoCounter } from "@datafactory/typosHelper";

let expectedText = `Sometimes you'll see a typo, other times you won't.`;
test(`typo counter`, async ({ page }) => {
  const typoCount = await typoCounter(page, 'Sometimes', expectedText, 10);
  expect(typoCount).toEqual(0);
})