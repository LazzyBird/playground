// @ts-check
import { test, expect } from "@playwright/test";
const taskURL =
  "https://the-internet.herokuapp.com/status_codes";
let codesURL = [
  "200",
  "301",
  "404",
  "500"
]
for (let i = 0; i < codesURL.length; i++) {
  test(`Check ${codesURL[i]} status code`, async ({ request }) => {
    let response = await request.get(taskURL + "/" + codesURL[i]);
    let expectedCode = parseInt(codesURL[i]);
    expect(response.status()).toBe(expectedCode);
  });
}

