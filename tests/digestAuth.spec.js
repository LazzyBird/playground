import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { fetchWithDigestAuth } from "@helpers/digestAuth";
const taskURL = Env.URL + "digest_auth";
test('cheesus', async () => {
  const correctAuth = await fetchWithDigestAuth(taskURL);
  expect(correctAuth.status).toBe(200);
});