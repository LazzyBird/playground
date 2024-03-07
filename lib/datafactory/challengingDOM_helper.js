export async function getTableTextData(page) {
  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tr"));
    const textData = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      // Exclude the last cell which contains "edit delete" links
      const rowData = cells.slice(0, -1).map((cell) => cell.innerText);
      return rowData;
    });
    return textData;
  });
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
