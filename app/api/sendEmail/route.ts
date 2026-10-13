import Mailgun from "mailgun.js";
import FormData from "form-data";
import { NextResponse } from "next/server";
import { normalizeContact, validateContact, contactEmail } from "@/lib/contact";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  let body: unknown;
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  try {
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Request is too large" },
          { status: 413 },
        );
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  } finally {
    reader.releaseLock();
  }
  const values = normalizeContact(body);
  const errors = validateContact(values);
  if (Object.keys(errors).length)
    return NextResponse.json(
      { error: "Invalid contact form", fields: errors },
      { status: 400 },
    );
  const {
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    MAILGUN_SENDER,
    MAILGUN_EMAIL_TO,
    MAILGUN_API_URL,
  } = process.env;
  if (
    !MAILGUN_API_KEY ||
    !MAILGUN_DOMAIN ||
    !MAILGUN_SENDER ||
    !MAILGUN_EMAIL_TO
  ) {
    return NextResponse.json(
      { error: "Email service is unavailable" },
      { status: 503 },
    );
  }
  try {
    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({
      username: "api",
      key: MAILGUN_API_KEY,
      timeout: 15000,
      ...(MAILGUN_API_URL ? { url: MAILGUN_API_URL } : {}),
    });
    const result = await client.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_SENDER,
      to: MAILGUN_EMAIL_TO,
      subject: `Personal Website Contact - ${values.email}`,
      "h:Reply-To": values.email,
      html: contactEmail(values),
    });
    return NextResponse.json({
      data: { id: result.id, message: result.message },
    });
  } catch {
    console.error("Mailgun contact delivery failed");
    return NextResponse.json(
      { error: "Unable to send contact form" },
      { status: 502 },
    );
  }
}
