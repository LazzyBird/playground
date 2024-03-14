import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
// import { fetchWithDigestAuth } from "@helpers/digestAuth";
import crypto from "crypto";
const taskURL = Env.URL + "digest_auth";

test("correct creds", async () => {
  const correctAuth = await fetchWithDigestAuth(taskURL);
  console.log(correctAuth);
  expect(correctAuth.status).toBe(200);
});

async function fetchWithDigestAuth(taskURL) {
  try {
    const initialResponse = await fetch(taskURL);
    const wwwAuthenticateHeader = initialResponse.headers.get("www-authenticate");
    const params = parseWWWAuthenticateHeader(wwwAuthenticateHeader);
    const authHeaders = generateDigestAuthHeaders(
      params,
      Env.ADMIN_NAME,
      Env.ADMIN_PASSWORD,
      "GET",
      "/protected/resource"
    );

    const response = await fetch(taskURL, { headers: authHeaders });

    const status = response.status;
    const body = await response.text();
    return { status, body };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
// Function to parse WWW-Authenticate header content
function parseWWWAuthenticateHeader(header) {
  const realm = header.match(/realm="(.*?)"/)[1];
  const nonce = header.match(/nonce="(.*?)"/)[1];
  const opaque = header.match(/opaque="(.*?)"/)[1];
  const qop = header.match(/qop="(.*?)"/)[1];
  return { realm, nonce, opaque, qop };
}

// Function to generate headers for Digest authentication
function generateDigestAuthHeaders(params, username, password, method, uri) {
  const realm = params.realm;
  const nonce = params.nonce;
  const nc = "00000001"; // Nonce count
  const cnonce = crypto.randomBytes(16).toString("hex"); // Client nonce
  const qop = "auth";
  const algorithm = "MD5"; // Digest algorithm

  // Calculate response
  const ha1 = crypto.createHash("md5").update(`${username}:${realm}:${password}`).digest("hex");
  const ha2 = crypto.createHash("md5").update(`${method}:${uri}`).digest("hex");
  const response = crypto.createHash("md5").update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`).digest("hex");

  // Construct Authorization header
  const authHeader =
    `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", ` +
    `algorithm=${algorithm}, qop=${qop}, nc=${nc}, cnonce="${cnonce}", response="${response}"`;

  return { Authorization: authHeader };
}
/*
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
