import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = `${Env.URL} +"challenging_dom"`;
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
const sampleLastCell = [
  { text: "edit", href: "#edit" },
  { text: "delete", href: "#delete" }
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
const lastColumnData = async (page) => {
  return await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll("table tr:not(:first-child)")
    );
    const links = [];
    rows.forEach((row) => {
      const lastCell = row.lastElementChild;
      if (lastCell) {
        const rowLinks = [];
        lastCell.querySelectorAll("a").forEach((link) => {
          rowLinks.push({
            text: link.innerText,
            href: link.getAttribute("href")
          });
        });
        links.push(rowLinks);
      }
    });
    return links;
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
// this test is verified for obtained and sample data, works fine
test("Last column verification with generated sample array", async ({
  page
}) => {
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
    expect(row).toEqual(
      sampleLastCell,
      `Row at index ${rowIndex} does not match the expected structure.`
    );
  });
});
// button tests are reliable and checked for correctness
test.describe("Button tests", () => {
  test("Clicking on 1st button changes #canvas", async ({ page }) => {
    //as far as it is complicated to get all three buttons and go around them - loop starts from 2nd button, 'cause for some reason browser does not change .nth(0) to .first, I decided to put them separately - no need to repeat with .nth(1) and .nth(2) elements. Just checking as separate functionality with different cases.
    page.waitForTimeout(1500);
    let zeroScreen = await page
      .locator("#canvas")
      .screenshot({ path: "screenshots/zero.jpeg", type: "jpeg" });

    await page.locator(".button").first().click();
    await page.waitForTimeout(2000);
    let currentScreen1 = await page.locator("#canvas").screenshot();
    expect(currentScreen1).not.toEqual(zeroScreen);
    zeroScreen = currentScreen1; // updates sample screenshot of the element
  });
});
