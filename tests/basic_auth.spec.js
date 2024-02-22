import { test, expect } from "@playwright/test";
import Env from "@helpers/env";

const taskURL = Env.URL + "basic_auth";
const taskURLwithCredentials = Env.CRED_URL;
const taskURLInvCred = Env.INV_CRED_URL;
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

test("Invalid credentials added in http credentials", async ({ page, request }) => {
  let response = await request.get(taskURLInvCred);
  expect(response.status()).toBe(401);
  await page.goto(taskURLInvCred);
  expect(page.locator("body")).toContainText("Not authorized");
}); // на 22 лютого ніби то працює та експліцитно покриває тест кейс невалідного пароля.Можна розширити на тести з пустими полями пароля й логіну.

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

test("Basic Auth Demo with empty credentials added in context", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: "", password: "" },
  });
  const page = await context.newPage();
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(401);
});
// взагалі думаю цей тест викинути, бо він буквально повинен був слати пусті данні, тре глянути в девтулз що при цьому відбувається. Працює коли не показується браузер, бо тут просто стоїть припущення на відповідь - й вона авжеж 401. Так само - як обробляється OK кнопка.
test("Clicking sign in without credentials leads to 401", async ({ page }) => {
  await page.goto(taskURL);
  page.on("dialog", (dialog) => dialog.accept());
  let response = await page.request.get(taskURL);
  expect(response.status()).toBe(401);
});
// перепровірити цей тест, бо дефолт відповідь 401 - й немає взаємодії з промпт вікном. Виглядає як варіант перевірки як скрипт обробляє cancel кнопку. Коли показувати браузер ввімкнуто, тест падає, бо повертає Error: page.goto: net::ERR_INVALID_AUTH_CREDENTIALS, й все, ніхто вже нічо не клікає або клацає ентер.
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
test.describe("HTTP Authenctication creds added in request headers", () => {
  test("HTTP Authentication valid credentials", async ({ page }) => {
    await page.route("**/*", (route) => {
      const credentialsOut = `${credentials.username}:${credentials.password}`;
      const authHeader = "Basic " + Buffer.from(credentialsOut).toString("base64");
      route.continue({ headers: { Authorization: authHeader } });
    });
    await page.goto(taskURL);
    await page.waitForSelector("p");
    await expect(page.locator("p")).toHaveText("Congratulations! You must have the proper credentials.");
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
  }); //ok
});
