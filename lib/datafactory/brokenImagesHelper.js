import { writeFileSync } from "fs";

async function checkImages(page) {
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const brokenImagesList = [];

    for (const image of images) {
      if (!image.complete || image.naturalWidth === 0) {
        brokenImagesList.push(image.src);
      }
    }
    return brokenImagesList;
  });

  return brokenImages;
}

function reportImages(images, saveToFile = false) {
  if (images.length > 0) {
    console.log(`Total of broken images: ${images.length}`);
    console.log(`Broken images:`);
    for (const src of images) {
      console.log(src);
    }
  } else {
    console.log("All images loaded properly.");
  }
  const result = {
    totalImages: images.length,
    brokenImages: images,
  };

  if (saveToFile && images.length > 0) {
    const saveReport = keyInYNStrict("Do you want to save the report to a log file?");
    if (saveReport) {
      const fileName = "test-reports/brokenImage_report.log";
      const content = `Total of broken images: ${images.length}\nBroken images:\n${images.join("\n")}\n`;
      writeFileSync(fileName, content);
      console.log(`Report saved to ${fileName}`);
    }
  }
  return result;
}
export default { checkImages, reportImages };
