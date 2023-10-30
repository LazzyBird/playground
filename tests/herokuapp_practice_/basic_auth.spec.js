import { test, expect } from "@playwright/test";
let taskURL = "https://the-internet.herokuapp.com/basic_auth";
let taskURLwithCredentials =
  "https://admin:admin@the-internet.herokuapp.com/basic_auth";

test("response status code is 401 until authenticated", async ({ request }) => {
  let response = await request.get(taskURL);
  expect(response.status()).toBe(401);
});

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
});
/*
test("Dismiss dialog leads to 401", async ({ page }) => {
    await page.goto(taskURL);
  page.on("dialog", async (dialog) => {
    if (dialog.type() === "prompt") {
      await dialog.dismiss();
    }
  });
  await expect(page.response().status().toBe(401));
}); */
test("Basic Auth Demo with valid credentials added in context", async ({
  browser
}) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "admin",
      password: "admin"
    }
  });
  let response = await request.get(taskURLwithCredentials);
expect(response.status()).toBe(200);
  const page = await context.newPage();
  await page.goto("taskURL");
  await expect(page.locator("div.example>h3")).toHaveText("Basic Auth");
});
