/* export async function getMenuItems(page) {
  const menu = await page.evaluate(() => {
    const menuItems = Array.from(document.querySelectorAll("li"));
    return menuItems.map((item) => item.innerText);
  });
  return menu;
} //! прибрати після перевірки й написання юніт тесту
 */
export async function getMenuItems(page) {
  const menu = await page.locator("li").innerTexts();
  return menu;
}