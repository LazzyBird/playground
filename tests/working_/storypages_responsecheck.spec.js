import { test } from "@playwright/test";
import { fs } from "fs";

let page;
const baseURL = "https://worldofwarcraft.blizzard.com/zh-tw/story"; // set locales with array's and its literal and iterate with loop

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(baseURL);
  // Extract links with the specified class
  let extractedLinks = await page.$$eval("a.ArticleTile-link", (elements) =>  // any other class for needed repeated element
    elements.map((link) => link.href)
  );
  // Clean up duplicates and set the data in the global variable
  global.cleanedLinks = Array.from(new Set(extractedLinks));
  global.time = global.cleanedLinks.length * 3000; // for 1st test timeout extension - request time  variates 700ms - 20s
});

test.afterAll(async () => {
  if (page) {
    await page.close();
  }
});

test("Verify links one by one", async ({}) => {
     // Access the extractedLinks from the global variable
  const cleanedLinks = global.cleanedLinks;
  // Create an array to store broken links and their details
  const brokenLinks = [];
test.setTimeout(global.time);
  // Iterate through each link in extractedLinks and check its status
  for (const url of cleanedLinks) {
    try {
        const response = await page.goto(url, { method: "HEAD" });
        const status = response ? response.status() : "No response";
  
        if (status >= 400) { // >=300 to detect pages with the redirection
          brokenLinks.push({ url, status });
        }
      } catch (error) {
        brokenLinks.push({ url, error: error.toString() });
      }
    }

  // Log the results
  if (brokenLinks.length === 0) {
    console.log("All links are working fine (status < 400).");
  } else {
    console.log("Broken links:");
    console.table(brokenLinks);

    // Save the error log to a file
    const errorLogFilePath = "error_log.json";
    const errorLogText = JSON.stringify(brokenLinks, null, 2);
    fs.writeFileSync(errorLogFilePath, errorLogText);
    console.log(`Error log saved to "${errorLogFilePath}".`);
  }
});
// grabbed links are stored in global scope, so I can extend this suit with checks for each page
// 