import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contactEmail,
  normalizeContact,
  validateContact,
} from "../../lib/contact";
const valid = {
  email: "user@example.test",
  phone: "",
  subject: "Hello",
  message: "Message",
};
test("normalizes whitespace, optional phone and rejects non-string fields", () => {
  assert.deepEqual(
    normalizeContact({
      email: " user@example.test ",
      phone: "+381 61 1234567",
      subject: 42,
      message: " hi ",
    }),
    {
      email: "user@example.test",
      phone: "+381611234567",
      subject: "",
      message: "hi",
    },
  );
  assert.equal(validateContact(normalizeContact(null)).email, "required");
});
test("validates required fields, email, country code and payload limits", () => {
  assert.deepEqual(validateContact(valid), {});
  assert.equal(
    validateContact({ ...valid, email: "not-an-email" }).email,
    "invalidEmail",
  );
  assert.equal(
    validateContact({ ...valid, phone: "0611234567" }).phone,
    "invalidPhoneNumber",
  );
  assert.deepEqual(validateContact({ ...valid, phone: "+381611234567" }), {});
  assert.equal(
    validateContact({ ...valid, message: "x".repeat(10001) }).message,
    "tooLong",
  );
  assert.equal(validateContact({ ...valid, subject: "" }).subject, "required");
});
test("email template preserves literal content without interpreting user HTML", () => {
  const html = contactEmail(
    {
      ...valid,
      subject: "<script>alert(1)</script>",
      message: "Hello & goodbye\n<img src=x onerror=alert(1)>",
    },
    new Date("2026-01-01T12:00:00Z"),
  );
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("Hello &amp; goodbye<br>&lt;img"));
  assert.ok(html.includes("Not provided"));
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<img"));
});
