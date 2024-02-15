import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/challenging_dom";
const tableLinksExpected = [
  "#edit",
  "#delete"
];
let page;
// here I can place some helper function щоб не заважали в інших місцях
const tableHeadersExpected = [
  "Lorem",
  "Ipsum",
  "Dolor",
  "Sit",
  "Amet",
  "Diceret",
  "Action"
];
const tableRowExpected = [
  "luvaret",
  "Apeirian",
  "Adipisci",
  "Definiebas",
  "Consequuntur",
  "Phaedrum"
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
    const thElements = await page.$$("th");
    let thTexts = [];
    for (const thElement of thElements) {
      const text = await thElement.innerText();
      thTexts.push(text);
    }
    expect(thTexts).toEqual(tableHeadersExpected);
  });

  test("Table text content is correct", async ({ page }) => {
    const tableRows = await page.$$(".tbody tr");
    for (const trElement of tableRows) {
      const columns = await trElement.$$("td");
      for (let i = 0; i < columns.length - 1; i++) {
        const actualText = await columns[i].innerText();
        const expectedText = tableRowExpected[i] + i;
        expect(actualText).toContain(expectedText);
      }
    }
  });
  test("Last column text is correct", async ({ page }) => {
    const lastColumn = await page.$$(".tbody tr:last-child");
    console.log(lastColumn.length);
    for (const trElement of lastColumn) {
      const actualText = await trElement.innerText();
      console.log(actualText);
      expect(actualText).toContain("edit delete");
    }
  });
  test("Table links are correct", async ({ page }) => {});

  test.describe("Button tests", () => {
    test("Check if the buttons are visible", async ({ page }) => {
      for (let i; (i = 0); i++) {
        await expect(page.locator(".button").nth(i)).toBeVisible();
      }
    });
    test("Clicking on button changes #canvas", async ({ page }) => {
      let zeroScreen = await page
        .locator("#canvas")
        .screenshot({ path: "screenshots/zero.jpeg", type: "jpeg" });

      for (let i = 0; i < 3; i++) {
        await page.locator(".button").nth(i).click();
        // Wait for changes to occur (adjust the time as needed) - if there was not enough time it would fail
        await page.waitForTimeout(1000);
        let currentScreen = await page.locator("#canvas").screenshot();
        expect(currentScreen).not.toEqual(zeroScreen);
        zeroScreen = currentScreen;
      }
    });
  });
});
