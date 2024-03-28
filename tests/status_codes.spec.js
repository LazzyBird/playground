// @ts-check
import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
import { codesURL } from "@data_assets/statusCodes";
const taskURL = Env.URL + "status_codes";

for (let i = 0; i < codesURL.length; i++) {
  test(`Check ${codesURL[i]} status code`, async ({ request }) => {
    let response = await request.get(taskURL + "/" + codesURL[i]);
    let expectedCode = parseInt(codesURL[i]);
    expect(response.status()).toBe(expectedCode);
  });
}

