import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { fetchWithDigestAuth } from "@helpers/digestAuth";
const taskURL = Env.URL + "digest_auth";

test('Digest Auth with correct creds returns status code 200', async () => {
  const response = await fetchWithDigestAuth(taskURL, Env.ADMIN_NAME, Env.ADMIN_PASSWORD);
  expect(response.status).toBe(200);
});
test('Digest Auth with wrong username -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, "admi", Env.ADMIN_PASSWORD);
  expect(response.status).toBe(401);
});
test('Digest Auth with wrong password -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, Env.ADMIN_NAME, "admi");
  expect(response.status).toBe(401);
});
test('Digest Auth with empty creds -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, "", "");
  expect(response.status).toBe(401);
});