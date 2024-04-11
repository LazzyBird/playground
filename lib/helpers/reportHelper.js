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
      const formattedData = data.map((entry) => formatEntry(entry));
      const logData = formattedData.join("\n");
      const fileName = `${filePathPrefix}/broken_${checkFunction.name}.log`;
      await appendLogFile(fileName, logData);
    }
  } catch (error) {
    console.error("Error in appendReport:", error.message);
  }
}
function formatEntry(entry) {
  const formattedDate = formatDate(entry.date);
  let formattedData = "";
  for (const key in entry) {
    if (key !== "date") {
      formattedData += `${key}: ${entry[key]}, `;
    }
  }
  return `${formattedDate}: ${formattedData}`;
}

function formatDate(date) {
  return date.toLocaleString();
}