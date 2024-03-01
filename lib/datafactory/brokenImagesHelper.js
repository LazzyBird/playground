import saveLogFile from "@helpers/saveLogFile";
export async function checkImages(page) {
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const brokenImagesList = [];

    for (const image of images) {
      if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
        brokenImagesList.push(image.src);
      } else {
        const imgRequest = new Image();
        imgRequest.src = image.src;
        imgRequest.onload = () => {};
      }
      imgRequest.onerror = () => {
        brokenImagesList.push(image.src);
      }
    }
    return brokenImagesList;
  });
  return brokenImages;
}

export function reportImages(images) {
  if (images.length > 0) {
    console.log(`Total of broken images: ${images.length}`);
    console.log(`Broken images:`);
    for (const src of images) {
      console.log(src);
    }
    const fileName = "test-reports/brokenImage_report.log";
    const content = `Total of broken images: ${images.length}\nBroken images:\n${images.join("\n")}\n`;
    saveLogFile(fileName, content);
  } else {
    console.log("All images loaded properly.");
  }
  const result = {
    totalImages: images.length,
    brokenImages: images,
  };
  return result;
}
