import * as fs from "node:fs/promises";
export async function appendLogFile(fileName, content) {
  try {
    await fs.appendFile(fileName, content);
    console.log(`Report saved to ${fileName}`);
  } catch (error) {
    console.error(`Error saving report to ${fileName}:`, error.message);
  }
}