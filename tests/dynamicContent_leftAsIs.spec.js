import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { getDescriptions, getVisibilityArray } from "@datafactory/dynamicContent";
const taskURL = Env.URL + "dynamic_content";
// const partiallyStaticContentURL = taskURL + "?with_content=static";
let page;
test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(taskURL);
});

test(`avatars are visible`, async ({ page }) => {
  for (let i = 1; i <= 3; i++) {
    await expect(page.getByRole("img").nth(i)).toBeVisible();
  }
});
// ALL ABOVE IS WORKING DO NOT TOUCH!!!!!!!
test(`descriptions are visible`, async ({ page }) => {
  const descriptions = await getDescriptions(page);
  const visibilityArray = await getVisibilityArray(descriptions);
  visibilityArray.forEach((isVisible, index) => {
    expect(isVisible).toBe(true, `Element at index ${index} is not visible`);
  });
});

test(`descriptions are strings`, async ({ page }) => {
  const descriptionsArray = Array.from(getDescriptions(page));
  const lengthsArrayPromises = descriptionsArray.map(async (desc) => {
    const length = await desc.textContent();
    return length;
  });
  const resolvedLengthsArray = await Promise.all(lengthsArrayPromises);
  // Now resolvedLengthsArray contains the resolved values
  resolvedLengthsArray.forEach((item, index) => {
    // Assertion 1: Check if each item is a string
    expect(typeof item).toBe(
      "string",
      `Item at index ${index} is not a string`
    );
    // Assertion 2: Check if each item has a length greater than 0
    expect(item.length).toBeGreaterThan(
      0,
      `Item at index ${index} has length 0`
    );
  });
}
);
