
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
};