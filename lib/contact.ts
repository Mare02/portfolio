export type ContactValues = {
  email: string;
  phone: string;
  subject: string;
  message: string;
};
export type ContactErrors = Partial<
  Record<
    keyof ContactValues,
    "required" | "invalidEmail" | "invalidPhoneNumber" | "tooLong"
  >
>;
export function normalizeContact(input: unknown): ContactValues {
  const body =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const text = (key: string) =>
    typeof body[key] === "string" ? body[key].trim() : "";
  return {
    email: text("email"),
    phone: text("phone").replace(/\s/g, ""),
    subject: text("subject"),
    message: text("message"),
  };
}
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ["email", "subject", "message"] as const)
    if (!values[field]) errors[field] = "required";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "invalidEmail";
  if (values.phone && !/^\+\d{5,17}$/.test(values.phone))
    errors.phone = "invalidPhoneNumber";
  for (const [field, limit] of Object.entries({
    email: 254,
    phone: 32,
    subject: 200,
    message: 10000,
  })) {
    if (values[field as keyof ContactValues].length > limit)
      errors[field as keyof ContactValues] = "tooLong";
  }
  return errors;
}
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}
export function contactEmail(values: ContactValues, now = new Date()) {
  return `<div>
    <h1>Someone has contacted you through your personal website!</h1>
    <p><strong>From (email):</strong> ${escapeHtml(values.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(values.phone || "Not provided")}</p>
    <hr>
    <p><strong>Subject:</strong> ${escapeHtml(values.subject)}</p>
    <p><strong>Message:</strong> ${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><strong>Sent at:</strong> ${now.toLocaleString("sr-Latn-RS", { timeZone: "Europe/Belgrade" })}</p>
  </div>`;
}
