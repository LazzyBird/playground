import { appendFile } from "node:fs";

export async function appendLogFile(fileName, content) {
  try {
    // Викликаємо appendFile з трьома параметрами
    appendFile(fileName, content, (error) => {
      if (error) {
        console.error(`Error saving report to ${fileName}:`, error.message);
      } else {
        console.log(`Report appended to ${fileName}`);
      }
    });
  } catch (error) {
    console.error(`Error saving report to ${fileName}:`, error.message);
  }
}
