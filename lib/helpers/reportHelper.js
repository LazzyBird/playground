import { saveLogFile } from "./saveLogFile";

export function generateReportData(data, checkFunction) {
  const brokenData = checkFunction(data);

  const reportData = {
    shouldSaveLog: brokenData.length > 0,
    fileName: `test-reports/broken_${checkFunction.name}_report.log`,
    content: `Total of broken items: ${brokenData.length}\nBroken items:\n${brokenData.join("\n")}\n`,
    message:
      brokenData.length > 0
        ? `Total of broken items: ${brokenData.length}\nBroken items:\n${brokenData.join("\n")}`
        : `All items for ${checkFunction.name} are in good condition.`,
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
