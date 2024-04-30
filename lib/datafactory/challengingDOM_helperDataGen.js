export function tableDataGen(tableRowExpected) {
  let tableData = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < tableRowExpected.length; j++) {
      let newText = tableRowExpected[j] + i;
      row.push(newText);
    }
    tableData.push(row);
  }
  return tableData.flat();
};
export function dataRef(a, b) {
  const array = [];
  for (let i = 1; i < a + 1; i++) {
    const item = `${i}.`;
    for (let k = 1; k < b + 1; k++) {
      array.push(item + k);
    }
  }
  return array;
};
