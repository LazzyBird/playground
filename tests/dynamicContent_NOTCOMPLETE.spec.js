import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "dynamic_content";
// const partiallyStaticContentURL = taskURL + "?with_content=static";
let page;
async function getDescriptions(page) {
  // Use page.$$ to query for elements and get a NodeList
  const descriptions = await page.$$("div.large-10.columns");
  descriptions.shift(); //removing parent div
  return descriptions;
};

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
  // Check the visibility of each element
  const visibilityArray = await Promise.all(
    descriptions.map(async (element) => {
      const isVisible = await element.isVisible();
      return isVisible;
    })
  );
  visibilityArray.forEach((isVisible, index) => {
    expect(isVisible).toBe(true, `Element at index ${index} is not visible`);
  });
});

test(`descriptions are strings`, async ({ page }) => {
    // Convert the NodeList to an array using Array.from()
  const descriptionsArray = Array.from(getDescriptions(page));
  // Use Promise.all to wait for all promises to be fulfilled
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
      `Item at index ${index} has length 0 or less`
    );
  });
  }
  );
