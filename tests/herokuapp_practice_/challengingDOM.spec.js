import { test, expect } from "@playwright/test";
const taskURL = "https://the-internet.herokuapp.com/challenging_dom";
const tableLinksExpected = ["#edit", "#delete"];
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
  "Iuvaret",
  "Apeirian",
  "Adipisci",
  "Definiebas",
  "Consequuntur",
  "Phaedrum"
];
function tableDataGen(tableRowExpected) {
  let tableData = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < tableRowExpected.length; j++) {
      let newText = tableRowExpected[j] + i;
      row.push(newText);
    }
    tableData.push(row);
  }
  return tableData;
}
const getTableTextData = async (page) => {
  return await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tr"));
    const textData = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      // Exclude the last cell which contains "edit delete" links
      const rowData = cells.slice(0, -1).map((cell) => cell.innerText);
      return rowData;
    });
    return textData;
  });
};
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
  // test for table content is rewritten well, functions are put out from the test and work properly. Obtained content data verified 
  test("Table text content is correct", async ({ page }) => {
    const generatedTableData = tableDataGen(tableRowExpected);
    const generatedTableText = generatedTableData.flat();
    const obtainedTableText = (await getTableTextData(page)).flat();
    expect(obtainedTableText).toEqual(generatedTableText);
  });
});
test("Last column text is correct", async ({ page }) => {
  const lastColumn = await page.$$("#example");
  console.log(lastColumn.length);
  /*
    for (const trElement of lastColumn) {
      const actualText = await trElement.innerText();
      console.log(actualText);
      expect(actualText).toBe("edit delete");
    }*/
});
test("Table links are correct", async ({ page }) => {});
// empty test
// button tests are reliable and checked for correctness
test.describe("Button tests", () => {
  test("Clicking on 1st button changes #canvas", async ({ page }) => {
    page.waitForTimeout(1500);
    let zeroScreen = await page
      .locator("#canvas")
      .screenshot({ path: "screenshots/zero.jpeg", type: "jpeg" });

    await page.locator(".button").first().click();
    await page.waitForTimeout(2000);
    let currentScreen1 = await page.locator("#canvas").screenshot();
    expect(currentScreen1).not.toEqual(zeroScreen);
    zeroScreen = currentScreen1;
  });
});
