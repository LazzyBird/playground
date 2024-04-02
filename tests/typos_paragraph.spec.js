import Env from "@helpers/env";
import { test, expect } from "@playwright/test";
import { typoCounter } from "@datafactory/typosHelper";
const taskURL = Env.URL + "typos";

let expectedText = `Sometimes you'll see a typo, other times you won't.`;
test(`typo counter`, async ({ page }) => {
  const typoCount = await typoCounter(page, taskURL, 'Sometimes', expectedText, 10);
  expect(typoCount).toEqual(0);
})