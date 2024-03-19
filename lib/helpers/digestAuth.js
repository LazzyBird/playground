import crypto from "crypto";

export const fetchWithDigestAuth = async function (taskURL, username, password) {
  try {
    const initialResponse = await fetch(taskURL);
    const wwwAuthenticateHeader = initialResponse.headers.get("www-authenticate");
    const params = parseWWWAuthenticateHeader(wwwAuthenticateHeader);
    const authHeaders = generateDigestAuthHeaders(
      params,
      username,
      password,
      "GET",
      "/digest_auth"
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
export function parseWWWAuthenticateHeader(header) {
  const realm = header.match(/realm="(.*?)"/)[1];
  const nonce = header.match(/nonce="(.*?)"/)[1];
  const opaque = header.match(/opaque="(.*?)"/)[1];
  const qop = header.match(/qop="(.*?)"/)[1];
  return { realm, nonce, opaque, qop };
}

export function generateDigestAuthHeaders(params, username, password, method, uri) {
  const realm = params.realm;
  const nonce = params.nonce;
  const opaque = params.opaque;
  const nc = "00000001"; // Nonce count
  const cnonce = crypto.randomBytes(4).toString("hex"); // Client nonce
  const qop = params.qop;
  const algorithm = "MD5";
  // Calculate response
  const ha1 = crypto.createHash("md5").update(`${username}:${realm}:${password}`).digest("hex");
  const ha2 = crypto.createHash("md5").update(`${method}:${uri}`).digest("hex");
  const response = crypto.createHash("md5").update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`).digest("hex");

  // Construct Authorization header
  const authHeader =
    `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", algorithm="${algorithm}", qop="${qop}", nc="${nc}", cnonce="${cnonce}",response="${response}", opaque="${opaque}"`;
  return { Authorization: authHeader };
}
