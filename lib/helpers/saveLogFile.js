import * as fs from "node:fs/promises";
async function saveLogFile(fileName, content) {
  try {
    await fs.writeFile(fileName, content);
    console.log(`Report saved to ${fileName}`);
  } catch (error) {
    console.error(`Error saving report to ${fileName}:`, error.message);
  }
}
export default saveLogFile;
