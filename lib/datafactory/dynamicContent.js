export async function getDescriptions(page) {
  // Use page.$$ to query for elements and get a NodeList
  const descriptions = await page.$$("div.large-10.columns");
  descriptions.shift(); //removing parent div
  return descriptions;
};
export async function getVisibilityArray(descriptions) {
  const visibilityArray = await Promise.all(
    descriptions.map(async (element) => {
      const isVisible = await element.isVisible();
      return isVisible;
    }));
  return visibilityArray;
}
//export async function 