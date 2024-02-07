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
/*
test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});
*/
test(`avatars are visible`, async ({ page }) => {
  for (let i = 1; i <= 3; i++) {
    await expect(page.getByRole("img").nth(i)).toBeVisible();
  }
});
test(`descriptions are visible`, async ({ page }) => {
  let description = page.evaluate(
    page.querySelectorAll("div.large-10.columns")
  );
for (let i = 1; i <= 3; i++) {
  expect (description[i].textContent.length > 0)
}})
/*
let vartext = document.querySelectorAll("div.large-10.columns")
console.log(vartext[3].textContent)
//*[@id="content"]/div[1]/div[2]
#content > div:nth-child(1) > div.large-10.columns
#content > div:nth-child(${i}) > div.large-10.columns
// wrong solution with classes 
const { test, expect } = require("@playwright/test");
let taskURL = "https://the-internet.herokuapp.com/dynamic_content?";
class Record {
  constructor(page, index) {
    this.page = page;
    this.index = index;
  }

  async getAvatar() {
    const avatarSelector = `.record:nth-child(${this.index}) [role="img"]`; // Adjust the selector as per your HTML structure
    return await this.page.$(avatarSelector);
  }

  getDescriptionXPath() {
    return `//*[@id="content"]/div[${this.index}]/div[2]/text()`; // Adjust the XPath as per your HTML structure
  }

  async getDescription() {
    const descriptionXPath = this.getDescriptionXPath();
    return await this.page.$(descriptionXPath);
  }

  async testVisibility() {
    const avatar = await this.getAvatar();
    const description = await this.getDescription();

    // Your visibility test logic here
    expect(await avatar.isVisible()).toBe(true);
    expect(await description.isVisible()).toBe(true);
  }
}

test.describe("Record Tests", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    // Setup your page, browser, and other configurations here
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    // Cleanup resources after all tests
    await page.close();
  });

  test.beforeEach(async () => {
    // Navigate to your base URL or perform any setup needed before each test
    await page.goto(`${taskURL}`, { timeout: 30000 });
  });

  test("Test Records Visibility", async () => {
    const recordCount = 3; // Assuming there are 3 records on the page

    for (let i = 1; i <= recordCount; i++) {
      const record = new Record(page, i);
      await record.testVisibility();
    }
  });
});
*/
