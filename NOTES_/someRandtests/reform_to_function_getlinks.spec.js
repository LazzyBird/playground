import { test, expect, request} from "@playwright/test";

//  global variables
let page, context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
});
test.beforeEach(async ({playwright}) => {
    apiContext = await playwright.request.newContext();
  });
// beforeEach step to create a new page on each test
test("Links at Story OK", async ({page}) => {
  await page.goto("https://playwright.dev/docs");

  // mapping links with certain class 
  const links = await page.$$eval("a", (elements) =>
    elements.map((link) => link.href)
  );
  // expect(links.length).toBeGreaterThan(0);
  console.log(`Total of links: ${links.length}`);
  const cleanListOfLinks = Array.from(new Set(links)); //clean up duplicates
  console.log(`Qty unique links: ${cleanListOfLinks.length}`);
  console.log(cleanListOfLinks);

  const delay_MS = 1000;
  for (let j = 0; j < cleanListOfLinks.length; j++) {
    const url = cleanListOfLinks[j];

    const pageRequest = await apiContext.get(url);
    expect(pageRequest.ok()).toBeTruthy();
    if (pageRequest.not.ok()) {
      console.log(`Response is not OK for ${url}`);
    }
    await apiContext.waitForTimeout(delay_MS);
  }
});
