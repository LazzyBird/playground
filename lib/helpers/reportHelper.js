import { saveLogFile } from "./saveLogFile";
import { appendLogFile } from "./appendLogFile"
import Env from "@helpers/env";

const filePathPrefix = Env.LOG_Path;

export async function putReport(data, checkFunction) {
  try {
    if (data && data.length > 0) {
      const formattedData = data.map((entry) => formatEntry(entry));
      const logData = formattedData.join("\n");
      const fileName = `${filePathPrefix}/broken_${checkFunction.name}.log`;
      await saveLogFile(fileName, logData);
    }
  } catch (error) {
    console.error("Error in putReport:", error.message);
  }
}
export async function appendReport(data, checkFunction) {
  try {
    if (data && data.length > 0) {
      const formattedData = data.map((entry) => formatEntry(entry)).join("\n");
      const fileName = `${filePathPrefix}/broken_${checkFunction.name}.log`;
      await appendLogFile(fileName, formattedData);
    }
  } catch (error) {
    console.error("Error in appendReport:", error.message);
  }
}
//? старий варіант щоб був, поки перевіряю як працює новий
/* function formatEntry(entry) {
  return Object.entries(entry)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
} */
function formatEntry(entry) {
  const formattedEntry = Object.entries(entry).map(([key, value]) => {
    if (typeof value === 'string' && (value.includes('\n') || value.includes('\r') || value.includes('\\'))) {
      return `${key}: "${value.replace(/"/g, '\\"')}"`;
    }
    // Якщо не має, просто повертаємо значення без змін
    return `${key}: ${value}`;
  });

  return formattedEntry.join(", ");
}