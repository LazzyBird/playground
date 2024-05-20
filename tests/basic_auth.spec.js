import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { messages } from "@data_assets/basic_auth";
const taskURL = Env.URL + "basic_auth";
const taskURLwithCredentials = Env.CRED_URL;
const taskURLInvCred = Env.INV_CRED_URL;
const credentials = {
  username: Env.ADMIN_NAME,
  password: Env.ADMIN_PASSWORD,
};

test("unauthorized get request returns 401", async ({ request }) => {
  let response = await request.get(taskURL);
  expect(response.status()).toBe(401);
}); // ok

test.describe("HTTP credentials", async () => {
  test("Valid credentials added in http credentials", async ({ page, request }) => {
    let response = await request.get(taskURLwithCredentials);
    expect(response.status()).toBe(200);
    await page.goto(taskURLwithCredentials);
    await expect(page.locator("body")).toContainText(messages.success);
  });

  test("Invalid credentials added in http credentials", async ({ page, request }) => {
    let response = await request.get(taskURLInvCred);
    expect(response.status()).toBe(401);
    await page.goto(taskURLInvCred);
    expect(page.locator("body")).toContainText(messages.error);
  });
});

test.describe("Context credentials", async () => {
  test("Basic Auth Demo with valid credentials added in context", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: credentials,
    });
    const page = await context.newPage();
    await page.goto(taskURL);
    await expect(page.locator("p")).toHaveText(messages.success);
    let response = await page.request.get(taskURL);
    expect(response.status()).toBe(200);
  });

  test("Basic Auth Demo with empty credentials added in context", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: { username: "", password: "" },
    });
    const page = await context.newPage();
    let response = await page.request.get(taskURL);
    expect(response.status()).toBe(401);
    await page.goto(taskURL);
    await expect(page.locator("body")).toContainText(messages.error);
  });
});

test.describe("HTTP Header Authenctication - creds added in request headers", () => {
  test("HTTP Authentication valid credentials", async ({ page }) => {
    await page.route("**/*", (route) => {
      const credentialsOut = `${credentials.username}:${credentials.password}`;
      const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
      route.continue({ headers: { Authorization: authHeader } });
    });
    await page.goto(taskURL);
    await page.waitForSelector("p");
    await expect(page.locator("p")).toHaveText(messages.success);
  }); //ok
  test("HTTP Authentication empty credentials", async ({ page }) => {
    await page.route("**/*", (route) => {
      const credentialsOut = `"":""`;
      const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
      route.continue({ headers: { Authorization: authHeader } });
    });
    let response = await page.request.get(taskURL);
    expect(response.status()).toBe(401);
  }); //ok
  test("HTTP Authentication only password", async ({ page }) => {
    await page.route("**/*", (route) => {
      const credentialsOut = `"":${credentials.password}`;
      const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
      route.continue({ headers: { Authorization: authHeader } });
    });
    let response = await page.request.get(taskURL);
    expect(response.status()).toBe(401);
  }); //ok
  test("HTTP Authentication only username", async ({ page }) => {
    await page.route("**/*", (route) => {
      const credentialsOut = `${credentials.username}:""`;
      const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
      route.continue({ headers: { Authorization: authHeader } });
    });
    let response = await page.request.get(taskURL);
    expect(response.status()).toBe(401);
  });
});
// TODO:
//? з абсолютно нез'ясованої причини плейрайт взагалі не бере тут діалогове вікно. у  випадку dismiss - підвантажує дефолтну 401 відповідь
// !: в принципі П&П бо API протестовано
/* 
test("Clicking cancel leads to 401", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    console.log(dialog.message(), dialog.type());
  });
  page.on("dialog", (dialog) => dialog.dismiss());
  await page.goto(taskURL);
  await expect(page.locator("body")).toContainText("Not authorized");
});
test("entering credintials  in prompt field and clicking ok leads to 200", async ({ page }) => {
  const dialogPromise = page.waitForEvent("dialog");
  await page.goto(taskURL, { waitUntil: 'domcontentloaded'});
  const dialog = await dialogPromise;
  await dialog.accept(`${credentials.username}`, `${credentials.password}`);

  page.waitForResponse(taskURL);
  page.on("dialog", async (dialog) => {
    await dialog.fill('input[name="username"]', credentials.username);
    await dialog.press('input[name="username"]', "Tab");
    await dialog.fill('input[name="password"]', credentials.password);
    await dialog.press('input[name="password"]', "Enter");
  });
  await dialog.accept(`${credentials.username}`, `${credentials.password}`);
  await expect(page.locator("p")).toHaveText("Congratulations! You must have the proper credentials."); /// ahahaha page is not loaded until prompt dialog is handled
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(200);
 }); */