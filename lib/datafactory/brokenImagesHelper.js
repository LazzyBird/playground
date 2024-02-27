function checkAndListImages(page) {
    // review function for correct return
  const brokenImages = page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const brokenImagesList = [];

    for (const image of images) {
      if (!image.complete || image.naturalWidth === 0) {
        brokenImagesList.push(image.src);
      }
    }

    return brokenImagesList;
  });

  if (brokenImages.length > 0) {
    console.log(`Total of broken images: ${brokenImages.length}`);
    console.log(`Broken images:`);
    for (const src of brokenImages) {
      console.log(src);
    }
  } else {
    console.log("All images loaded properly.");
  }
  // Return a custom result object
  const testResult = {
    totalImages: brokenImages.length,
    brokenImages,
  };
  return testResult;
}
