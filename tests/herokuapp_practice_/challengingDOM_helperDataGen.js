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
  for (let i = 0; i < 10 ; i++) {
    let row = [];
    for (let j = 0; j < tableRowExpected.length; j++) {
      let newText = tableRowExpected[j] + i;
      row.push(newText);
    }
    tableData.push(row);
  }
  return tableData;
};
