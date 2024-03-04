export async function scrapImg(page) {
  const images = await page.evaluate(() => {
    const imageSrcElements = Array.from(document.querySelectorAll("img"));
    return imageSrcElements.map((image) => image.src);
  });
  return images;
} // ok
export async function checkImages(images) {
  const imagesArray = Array.isArray(images) ? images : [images];

  const brokenImages = imagesArray.filter(
    (image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0
  );

  return brokenImages;
}

export async function checkImgSrc(page) {
  try {
    const images = await scrapImg(page);
    const rawResults = await Promise.all(
      images.map(async (image) => {
        try {
          const response = await fetch(image);
          if (!response.ok) {
            return { imgSrc: image, status: `${response.status}` };
          }
          return { imgSrc: image, status: "ok" };
        } catch (error) {
          return { imgSrc: image, status: "error" };
        }
      })
    );
    const results = rawResults.filter((result) => result.status !== "ok");
    return results;
  } catch (error) {
    console.error("Error in checkImgSrc:", error.message);
    return [];
  }
} // review needed
