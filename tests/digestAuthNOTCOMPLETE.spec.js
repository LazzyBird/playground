import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { fetchWithDigestAuth } from "@helpers/digestAuth";
const taskURL = Env.URL + "digest_auth";
test('cheesus', async () => {
  const correctAuth = await fetchWithDigestAuth(taskURL);
  console.log(correctAuth);
  // expect(correctAuth.status).toBe(200);
})
/*
test("correct creds", async ({ request }) => {
  const header1 = await request.get(`${taskURL}`);
  console.log(header1);
});
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach("Open URL", async ({ page }) => {
  await page.goto(taskURL);
});
*/