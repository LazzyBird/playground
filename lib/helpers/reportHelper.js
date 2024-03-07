import { saveLogFile } from "./saveLogFile";
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
function formatEntry(entry) {
  return Object.entries(entry)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}
