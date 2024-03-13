import { test, expect } from "@playwright/test";
import Env from "@helpers/env";
const taskURL = Env.URL + "digest_auth";
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
test(async () => {
  {
    // Step 1: Send a request that requires Digest authentication
    fetch(taskURL)
      .then((response) => {
        // Step 2: Extract the WWW-Authenticate header content
        const wwwAuthenticateHeader = response.headers.get("www-authenticate");
        // Step 3: Parse the header content
        const params = parseWWWAuthenticateHeader(wwwAuthenticateHeader);
        // Step 4: Generate headers for Digest authentication
        const authHeaders = generateDigestAuthHeaders(params, "username", "password", "GET", "/protected/resource");
        // Step 5: Include the generated headers in the subsequent request
        return fetch(taskURL, { headers: authHeaders });
      })
      .then((response) => {
        // Handle the response of the chained request
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

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
  }
});
/*
Www-Authenticate: Digest realm="Protected Area", nonce="MTcxMDMzODQwNyBmYWE5N2Q0NTQ0NDJhMDYxYjlhMTVmMzhiYTk4ZjU0OQ==", opaque="610a2ee688cda9e724885e23cd2cfdee", qop="auth"
*/
