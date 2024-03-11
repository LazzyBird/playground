import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { getTableTextData, lastColumnData, getTableHeaders } from "@datafactory/challengingDOM_helper";
import { tableHeadersExpected, tableRowExpected, sampleLastCell } from "@data_assets/challengingDOM";
const taskURL = Env.URL + "challenging_dom";

test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  let page = context.newPage();
});
test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
});
test.afterAll(async ({ browser }) => {
  await browser.close();
});
//TODO: rewrite test after helper setups
test.describe("Table tests", () => {
  test("Check if the table is visible", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("Check if the table headers are correct", async ({ page }) => {
    const thTexts = await getTableHeaders(page);
    expect(thTexts).toEqual(tableHeadersExpected);
  });
  // test for table content is rewritten well, functions are put out from the test and work properly. Obtained content data verified
  test("Table text content is correct", async ({ page }) => {
    const generatedTableText = tableDataGen(tableRowExpected).flat();
    const obtainedTableText = (await getTableTextData(page)).flat();
    expect(obtainedTableText).toEqual(generatedTableText);
  });
});
// this test is verified for obtained and sample data, works fine
test("Last column verification with generated sample array", async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  const sampleArray = Array(obtainedLastColumnData.length).fill(sampleLastCell);
  expect(obtainedLastColumnData).toEqual(sampleArray);
});
// this test is verified for outcome, data compared correctly
test("Last column verification with for.. of", async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  for (const x of obtainedLastColumnData) {
    console.log(x);
    expect(x).toEqual(sampleLastCell, `something went wrong`);
  }
});
// this test is verified for outcome, data compared correctly
test(`last cell test with forEach`, async ({ page }) => {
  const obtainedLastColumnData = await lastColumnData(page);
  obtainedLastColumnData.forEach((row, rowIndex) => {
    console.log(row);
    expect(row).toEqual(sampleLastCell, `Row at index ${rowIndex} does not match the expected structure.`);
  });
});
// button tests are reliable and checked for correctness
test.describe("Button tests", () => {
  test("Clicking on 1st button changes #canvas", async ({ page }) => {
    //as far as it is complicated to get all three buttons and go around them - loop starts from 2nd button, 'cause for some reason browser does not change .nth(0) to .first, I decided to put them separately - no need to repeat with .nth(1) and .nth(2) elements. Just checking as separate functionality with different cases.
    page.waitForTimeout(1500);
    let zeroScreen = await page.locator("#canvas").screenshot({ path: "screenshots/zero.jpeg", type: "jpeg" });

    await page.locator(".button").first().click();
    await page.waitForTimeout(2000);
    let currentScreen1 = await page.locator("#canvas").screenshot();
    expect(currentScreen1).not.toEqual(zeroScreen);
    zeroScreen = currentScreen1; // updates sample screenshot of the element
  });
});
