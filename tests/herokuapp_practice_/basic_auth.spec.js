import { test, expect } from "@playwright/test";
let taskURL = "https://the-internet.herokuapp.com/basic_auth";
let taskURLwithCredentials =
  "https://admin:admin@the-internet.herokuapp.com/basic_auth";
const credentials = {
  username: "admin",
  password: "admin"
};

test("response status code is 401 until authenticated", async ({ request }) => {
  let response = await request.get(taskURL);
  expect(response.status()).toBe(401);
}); // ok

test("Valid credentials added in http credentials", async ({
  page,
  request
}) => {
  let response = await request.get(taskURLwithCredentials);
  expect(response.status()).toBe(200);
  await page.goto(taskURLwithCredentials);
  await expect(page.locator("p")).toHaveText(
    "Congratulations! You must have the proper credentials."
  );
}); // ok

test("Basic Auth Demo with valid credentials added in context", async ({
  browser
}) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "admin",
      password: "admin"
    }
  });

  const page = await context.newPage();
  await page.goto(taskURL);
  await expect(page.locator("p")).toHaveText(
    "Congratulations! You must have the proper credentials."
  );
}); // ok

test("Clicking sign in without credentials leads to 401", async ({ page }) => {
  await page.goto(taskURL);
  let response = await page.request.get(taskURL);
  page.on("dialog", (dialog) => dialog.accept());
  expect(response.status()).toBe(401);
}); // ok

test("Clicking cancel leads to 401", async ({ page }) => {
  await page.goto(taskURL);
  let response = await page.request.get(taskURL);
  page.on("dialog", (dialog) => dialog.dismiss());
  expect(response.status()).toBe(401);
}); // ok

test("entering credintials  in prompt field and clicking ok leads to 200", async ({
  page
}) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept(credentials.username, credentials.password);
    await page.goto(taskURL, { waitUntil: "load" });
  });
  // await page.goto(taskURL, { waitUntil: "load" });
  await expect(page.locator("p")).toHaveText(
    "Congratulations! You must have the proper credentials."
  ); /// ahahaha page is not loaded until prompt dialog is handled
  /*let response = await page.request.get(taskURL);
  expect(response.status()).toBe(200); */
});
