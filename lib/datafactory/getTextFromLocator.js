export const getTextFromLocator = async (page, locator) => {
  if (!page || !locator) {
    throw new Error('Both "page" and "locator" parameters are required');
  }

  try {
    const menu = await page.locator(`${locator}`).allTextContents();
    return menu;
  } catch (error) {
    throw new Error(`Failed to get text from locator: ${error.message}`);
  }
}
export const compareWithReferenceData = async (page, locator, referenceData, maxAttempts) => {
  if (!page || !locator || !referenceData || !maxAttempts) {
    throw new Error(
      'Both "page" and "locator" and "referenceData" parameters are required'
    );
  }

}