import { putReport } from "@helpers/reportHelper";
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
export const compareWithReferenceData = async (data, referenceData) => {
  if (!data || !referenceData) {
    throw new Error(
      'some input data is missing'
    );
  }
  try {
    const missingData = referenceData.filter((item) => !data.includes(item));
    return missingData;
  } catch (error) {
    throw new Error(`Failed to compare data with reference data: ${error.message}`);
  }
}
export const pageReload = async (page, url, locator, referenceData, maxAttempts) => {
  const attempts = Number(maxAttempts);
  const errors = [];
  let errorCount = 0;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await page.goto(url);
    } catch (err) {
      console.error(`Failed to navigate to ${taskURL} in attempt ${attempt}`);
      console.error(err);
      continue;
    }
    try {
      const obtainedText = await getTextFromLocator(page, locator);
      const missingData = await compareWithReferenceData(obtainedText, referenceData);
      if(missingData.length > 0) {
        errorCount++;
        errors.push({ attempt, missingData });
      }
    } catch (err) {
      console.error(`Failed to obtain text in attempt ${attempt}`);
      console.error(err);
    }
  } try { await putReport(errors, pageReload); } catch (err) { console.error("Failed to putReport"); console.error(err); }
  return errorCount;
}