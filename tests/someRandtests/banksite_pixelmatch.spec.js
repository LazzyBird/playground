//@ts-check
const { test, expect } = require("@playwright/test");
const { PNG } = require("pngjs");
const fs = require("fs");
const path = require("path");
const pixelmatch = require("pixelmatch");

const screenshotsDir = path.join(__dirname, "screenshots");

let comparisonResult;
// Change borderValue to define level of accepted differrences
let borderValue = 0.2;

test.beforeEach(async ({ page }) => {
  await page.goto("https://parabank.parasoft.com/parabank/index.htm");
});

test("layout check", async ({ page }) => {
  let screenshotPath = path.join(screenshotsDir, "layout.png");
  await page.screenshot({ path: screenshotPath });

  const indexImage = path.join(screenshotsDir, "index_parabank.png");
  const layoutImage = path.join(screenshotsDir, "layout.png");

  // Read the images as PNG using pngjs
  const indexImagePNG = PNG.sync.read(fs.readFileSync(indexImage));
  const layoutImagePNG = PNG.sync.read(fs.readFileSync(layoutImage));

  // Ensure that the images have the same dimensions
  if (indexImagePNG.width !== layoutImagePNG.width || indexImagePNG.height !== layoutImagePNG.height) {
    throw new Error("Images have different dimensions");
  }

  const diffImagePNG = new PNG({ width: indexImagePNG.width, height: indexImagePNG.height });

  // Compare the images using pixelmatch
  const threshold = 0.1; // Adjust the threshold as per your needs
  const diffPixelCount = pixelmatch(indexImagePNG.data, layoutImagePNG.data, diffImagePNG.data, indexImagePNG.width, indexImagePNG.height, { threshold });

  // Calculate the percentage difference
  const totalPixels = indexImagePNG.width * indexImagePNG.height;
  const differencePercentage = (diffPixelCount / totalPixels) * 100;

  comparisonResult = {
    isSameDimensions: true,
    dimensionDifference: {
      width: 0,
      height: 0,
    },
    rawMisMatchPercentage: differencePercentage,
    misMatchPercentage: `${differencePercentage.toFixed(2)}`,
    diffBounds: {
      top: 0,
      left: 0,
      bottom: indexImagePNG.height,
      right: indexImagePNG.width,
    },
    analysisTime: 0,
  };

  // Save the diff image with marked differences
  const diffImagePath = path.join(screenshotsDir, "diff.png");
  const diffImageBuffer = PNG.sync.write(diffImagePNG);
  fs.writeFileSync(diffImagePath, diffImageBuffer);
  
  // Assert the differencePercentage is within the acceptable range
  expect(differencePercentage).toBeLessThanOrEqual(borderValue, `Image difference percentage: ${differencePercentage}% exceeds the border value: ${borderValue}%`);

});

test.afterAll(async () => {
  console.log("Pixelmatch comparison result:");
  console.log(JSON.stringify(comparisonResult, null, 2));
});
