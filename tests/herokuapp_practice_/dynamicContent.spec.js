import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/dynamic_content?";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test(`avatars are visible`, async ({ page }) => {
  for (let i = 1; i <= 3; i++) {
    await expect(page.getByRole("img").nth(i)).toBeVisible();
  }
});
// ALL ABOVE IS WORKING DO NOT TOUCH!!!!!!!
/* CODE FOR BROWSER CONSOLE
 let vartext = document.querySelectorAll("div.large-10.columns")
for(let i = 1; i<=3; i++){
console.log(vartext[i].textContent.length)};
*/
test(`descriptions are visible`, async ({ page }) => {
  // Use page.$$ to query for elements and get a NodeList
  const descriptions = await page.$$("div.large-10.columns");
  // Convert the NodeList to an array using Array.from()
  const descriptionsArray = Array.from(descriptions);
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
});
