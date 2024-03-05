import { saveLogFile } from "./saveLogFile";
/*
export function generateReportData(data, checkFunction) {
  const brokenData = checkFunction(data);
  const reportData = {
    shouldSaveLog: brokenData.length > 0,
    fileName: `test-reports/broken_${checkFunction.name}.log`,
    content: `Total of broken items: ${brokenData.length}\nBroken items:\n${brokenData.map((item) => item.imgSrc).join("\n")}\n`,
    message:
      brokenData.length > 0
        ? `Total of broken items: ${brokenData.length}\nBroken items:\n${brokenData.map((item) => item.imgSrc).join("\n")}`
        : `All items for ${checkFunction.name} are in good condition.`,
    brokenItems: brokenData,
  };
  return reportData;
}

export function reportData(reportData) {
  if (reportData.shouldSaveLog) {
    saveLogFile(reportData.fileName, reportData.content);
  }

  console.log(reportData.message);

  return {
    totalItems: reportData.shouldSaveLog ? reportData.brokenItems.length : 0,
    brokenItems: reportData.shouldSaveLog ? reportData.brokenItems : [],
  };
}
*/
export function putReport(data, checkFunction) {
  if (data) {
    data = formatData(data);
    saveLogFile(`test-reports/broken_${checkFunction.name}.log`, data);
  }
}
function formatData(data) {
  let formattedData = [];
  for (item of data) {
    const string = {}; // для кожного з елементів форматованого масиву додаємо перенос на новий рядок - формуємо данні для запису в файл. функція putReport буде викликакатися з функції перевірки елементів page object'a - й якщо результат перевірки буде містити truthy значення - тобто щось у тесті буде завалено, одразу отримані результати будуть записані в файл.
    //TODO: допили цю функцію
    formattedData.push({
      item,
    });
  }
  return formattedData;
}
function logObjectArray(arr) {
  return arr.map((obj, index) => {
    let result = `${index + 1}: `;
    for (const key in obj) {
      result += `${key}: ${obj[key]}, `;
    }
    return result.slice(0, -2);
  });
}