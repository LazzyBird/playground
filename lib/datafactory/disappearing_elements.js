export async function getMenuItems(page) {
  const menu = await page.evaluate(() => {
    const menuItems = Array.from(document.querySelectorAll("li"));
    return menuItems.map((item) => item.innerText);
  });
  return menu;
}
