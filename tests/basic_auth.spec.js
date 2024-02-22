import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

const taskURL = Env.URL + "basic_auth";
const taskURLwithCredentials = Env.CRED_URL;
const credentials = {
  username: Env.ADMIN_NAME,
  password: Env.ADMIN_PASSWORD,
};

test("response status code is 401 until authenticated", async ({ request }) => {
  let response = await request.get(taskURL);
  expect(response.status()).toBe(401);
}); // ok

test("Valid credentials added in http credentials", async ({ page, request }) => {
  let response = await request.get(taskURLwithCredentials);
  expect(response.status()).toBe(200);
  await page.goto(taskURLwithCredentials);
  await expect(page.locator("p")).toHaveText("Congratulations! You must have the proper credentials.");
}); // ok

test("Basic Auth Demo with valid credentials added in context", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: credentials,
  });

  const page = await context.newPage();
  await page.goto(taskURL);
  await expect(page.locator("p")).toHaveText("Congratulations! You must have the proper credentials.");
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(200);
}); // ok
// перепровірити цей тест, бо дефолт відповідь 401
/// гаааа воно працювало а тепер ніБ як й той що нижче аааАААаАаАаА
test("Clicking sign in without credentials leads to 401", async ({ page }) => {
  await page.goto(taskURL);
  page.on("dialog", (dialog) => dialog.accept());
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(401);
}); // ok
// перепровірити цей тест, бо дефолт відповідь 401
test("Clicking cancel leads to 401", async ({ page }) => {
  await page.goto(taskURL);
  page.on("dialog", (dialog) => dialog.dismiss());
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(401);
});
// this is the Playwright limitation on handling dialogue window no unauthorized page:
test("entering credintials  in prompt field and clicking ok leads to 200", async ({ page }) => {
  await page.goto(taskURL);
  console.log(await page.content());
  /*
  const dialog = await page.waitForEvent("dialog");
  await dialog.accept(credentials.username, credentials.password);
  await page.waitForLoadState();
  await expect(page.locator("p")).toHaveText(
    "Congratulations! You must have the proper credentials."
  ); /// ahahaha page is not loaded until prompt dialog is handled
  /*let response = await page.request.get(taskURL);
  expect(response.status()).toBe(200); */
});
test("HTTP Authentication", async ({ page }) => {
  await page.route("**/*", (route) => {
    const credentialsOut = `${credentials.username}:${credentials.password}`;
    const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
    route.continue({ headers: { Authorization: authHeader } });
  });
  await page.goto(taskURL);
  await page.waitForSelector("p");
  await expect(page.locator("p")).toHaveText("Congratulations! You must have the proper credentials.");
});
