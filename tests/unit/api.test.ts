import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../../app/api/sendEmail/route";

test("contact API returns unavailable rather than sending or exposing configuration when credentials are absent", async () => {
  const previous = process.env.MAILGUN_API_KEY;
  delete process.env.MAILGUN_API_KEY;
  try {
    const response = await POST(
      new Request("http://localhost/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "user@example.test",
          subject: "Subject",
          message: "Message",
        }),
      }),
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Email service is unavailable",
    });
  } finally {
    if (previous === undefined) delete process.env.MAILGUN_API_KEY;
    else process.env.MAILGUN_API_KEY = previous;
  }
});
