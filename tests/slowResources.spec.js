import { test, expect } from "@playwright/test";
import { document, slowRequest } from "@data_assets/slowResources";
test('normal document loading', async () => {
    const response = await document;
    expect(response.status).toBe(200);
});
test('slow request', async () => {
    test.setTimeout(50000);
    const response = await slowRequest;
    expect(response.status).toBe(503);
});
