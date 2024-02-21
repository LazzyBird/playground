//@ts-check
const { test, expect } = require("@playwright/test");
const { promisify } = require("util");
const path = require("path");
const resemble = require("resemblejs");
const fs = require("fs");

const screenshotsDir = path.join(__dirname, "screenshots");

let comparisonResult, page;

test.beforeEach(async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
});

test("layout check", async ({ page }) => {
  let screenshotPath = path.join(screenshotsDir, "layout.png");
  await page.screenshot({ path: screenshotPath });

  const indexImage = path.join(screenshotsDir, "index_parabank.png");
  const layoutImage = path.join(screenshotsDir, "layout.png");

  const options = {
    output: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255,
      },
      errorType: "movement",
      transparency: 0.3,
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true,
    },
    scaleToSameSize: true,
    ignore: "antialiasing",
  };

  const compareImages = promisify(resemble.compare);

  // Configure output settings
  resemble.outputSettings(options.output);

  comparisonResult = await compareImages(indexImage, layoutImage, options);
});

test.afterAll(async () => {
  console.log("Resemble.js comparison result:");
  console.log(JSON.stringify(comparisonResult, null, 2));

  // Save the combined image with differences marked
  const combinedImagePath = path.join(screenshotsDir, "combined.png");
  fs.writeFileSync(combinedImagePath, comparisonResult.getBuffer());

});
