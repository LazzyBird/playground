export 
  const getTableTextData = async (page) => {
    let textData;
    const rowCount = await page.locator('tbody >> tr').count();
    for (let y = 0; y < rowCount; y++) {
      const cellLoc = page.locator('tbody >> tr').nth(y).locator('td');
      const cellCount = await cellLoc.count();
      for (let x = 0; x < cellCount - 1; x++) {
        textData[y][x] = await cellLoc.nth(x).innerText();
      }
    }
    return textData
  }
  
export async function lastColumnData(page) {
  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tr:not(:first-child)"));
    const links = [];
    rows.forEach((row) => {
      const lastCell = row.lastElementChild;
      if (lastCell) {
        const rowLinks = [];
        lastCell.querySelectorAll("a").forEach((link) => {
          rowLinks.push({
            text: link.innerText,
            href: link.getAttribute("href"),
          });
        });
        links.push(rowLinks);
      }
    });
    return links;
  });
}
export async function getTableHeaders(page) {
  const thElements = await page.$$("th");
  let thTexts = [];
  for (const thElement of thElements) {
    const text = await thElement.innerText();
    thTexts.push(text);
  }
  return thTexts;
}
