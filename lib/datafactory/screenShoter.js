export async function screenShoter(page, selector, saveScreenshot) {
  let screenshotData;
  if (saveScreenshot) {
    screenshotData = await page
      .locator(selector)
      .screenshot({ path: `screenshots/${selector}.jpeg`, type: "jpeg" });
  } else {
    screenshotData = await page.locator(selector).screenshot();
  }

  return screenshotData;
}
