import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/challenging_dom";
let page;
// here I can place some helper function щоб не заважали в інших місцях
const tableHeadersExpected = [
  ["Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Diceret", "Action"]
];
//

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(`${taskURL}`, { timeout: 30000 });
});

test.describe("Table tests", () => {
  test("Check if the table is visible", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();
  });
  test("Check if the table headers are correct", async ({ page }) => {
    const tableHeaders = await page
      .locator("table")
      .getByRole("thead")
      .allTextContents();
    expect(tableHeaders).toEqual(tableHeadersExpected);
  }); /*
  test("Table text content are correct", async ({ page }) => {

  });
  test("All rows have two anchor links in the last column", async ({ page }) => {

  }); */
});

test.describe("Button tests", () => {
  test("Check if the buttons are visible", async ({ page }) => {
    for (let i; (i = 0); i++) {
      await expect(page.locator("#button").nth(i)).toBeVisible();
    }
  });
  test("Clicking on button changes #canvas", async ({ page }) => {
    let zeroScreen = await page.locator("#canvas").screenshot();
    for (let i = 0; i < 3; i++) {
      await page.locator("#button").nth(i).click();
      //
      await expect(page.locator("#canvas")).not.toHaveScreenshot(zeroScreen);
    }
  });
});
