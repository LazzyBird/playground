const { test, expect } = require("@playwright/test");

const taskURL =
  "https://the-internet.herokuapp.com/shifting_content/menu?mode=random&pixel_shift=200";
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(taskURL);
  await page.waitForLoadState("load");
});

test("Home menu item is according to layout ", async ({ page }) => {
  /*await page
    .getByText("Home")
    .screenshot({ path: "screenshots/home.png" });*/
  await expect(page.getByText("Home")).toHaveScreenshot(
    "screenshots/home.png"
  );
});

test("About menu item is according to layout ", async ({ page }) => {
  /* await page
    .getByText("About")
    .screenshot({ path: "screenshots/about.png" });*/
  await expect(page.getByText('About')).toHaveScreenshot(
    "screenshots/about.png"
  );
});

test("Contact Us menu item is according to layout ", async ({ page }) => {
 /*  await page
    .getByText("Contact Us")
    .screenshot({ path: "screenshots/contact.png" });*/
  await expect(page.getByText('Contact Us')).toHaveScreenshot(
    "screenshots/contact.png"
  );
});

test("Portfolio menu item is according to layout ", async ({ page }) => {
   /*await page
    .getByText("Portfolio")
    .screenshot({ path: "screenshots/portfolio.png" }); */
  await expect(page.getByText('Portfolio')).toHaveScreenshot(
    "screenshots/portfolio.png"
  );
});

test("Gallery menu item is according to layout ", async ({ page }) => {
  /*await page
    .getByText("Gallery")
    .screenshot({ path: "screenshots/gallery.png" });*/
  await expect(page.getByText("Gallery")).toHaveScreenshot({
    path: "screenshots/gallery.png"
  });
});
