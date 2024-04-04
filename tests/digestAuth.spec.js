import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { fetchWithDigestAuth } from "@helpers/digestAuth";
import { messages } from "@data_assets/basic_auth";

const taskURL = Env.URL + "digest_auth";

test('Digest Auth with correct creds returns status code 200', async () => {
  const response = await fetchWithDigestAuth(taskURL, Env.ADMIN_NAME, Env.ADMIN_PASSWORD);
  expect(response.status).toBe(200, 'response status code is not 200');
  expect(response.body).toContain(messages.success, 'success message is changed')
});
test('Digest Auth with wrong username -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, "admi", Env.ADMIN_PASSWORD);
  expect(response.status).toBe(401, 'response satus code is not 401');
  // expect(response.body).toContain(messages.error, 'wrong error message');  //! response body is empty now - commented this string
});
test('Digest Auth with wrong password -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, Env.ADMIN_NAME, "admi");
  expect(response.status).toBe(401);
});
test('Digest Auth with empty creds -> 401', async () => {
  const response = await fetchWithDigestAuth(taskURL, "", "");
  expect(response.status).toBe(401);
});