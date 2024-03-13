import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { getTableTextData, lastColumnData, getTableHeaders } from "@datafactory/challengingDOM_helper";
import { tableHeadersExpected, tableRowExpected, sampleLastCell } from "@data_assets/challengingDOM";
import { tableDataGen } from "@datafactory/challengingDOM_helperDataGen";
const taskURL = Env.URL + "challenging_dom";
let page;

test.beforeAll("get the page object", async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(taskURL);
});
test.describe("Table tests", () => {
  test("Check if the table is visible", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("Check if the table headers are correct", async ({ page }) => {
    const thTexts = await getTableHeaders(page);
    expect(thTexts).toEqual(tableHeadersExpected);
  });
  test("Table text content is correct", async ({ page }) => {
    const generatedTableText = tableDataGen(tableRowExpected);
    const obtainedTableText = await getTableTextData(page);
    expect(obtainedTableText).toEqual(generatedTableText);
  });
});
test("Last column verification with generated sample array", async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  const sampleArray = Array(obtainedLastColumnData.length).fill(sampleLastCell);
  expect(obtainedLastColumnData).toEqual(sampleArray);
});
test("Last column verification with for.. of", async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  for (const x of obtainedLastColumnData) {
    console.log(x);
    expect(x).toEqual(sampleLastCell, `something went wrong`);
  }
});
test(`last cell test with forEach`, async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  obtainedLastColumnData.forEach((row, rowIndex) => {
    console.log(row);
    expect(row).toEqual(sampleLastCell, `Row at index ${rowIndex} does not match the expected structure.`);
  });
});
test.describe("Button tests", () => {
  test("Clicking on 1st button changes #canvas", async ({ page }) => {
    page.waitForLoadState('load');
    let zeroScreen = await page.locator("#canvas").screenshot({ path: "screenshots/zero.jpeg", type: "jpeg" });
    await page.locator(".button").first().click();
    await page.waitForLoadState('load');
    let currentScreen1 = await page.locator("#canvas").screenshot();
    expect(currentScreen1).not.toEqual(zeroScreen, 'The button does not change the canvas');
    zeroScreen = currentScreen1; // updates sample screenshot of the element
  });
});
