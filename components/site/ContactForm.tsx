"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import {
  normalizeContact,
  validateContact,
  type ContactValues,
  CONTACT_LIMITS,
} from "@/lib/contact";
import { buttonClass, primaryButtonClass } from "./Shared";
import { Icon } from "./Icon";
export function ContactForm({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  const [values, setValues] = useState<ContactValues>({
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactValues, boolean>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => setShowToast(false), 4000);
    return () => window.clearTimeout(timer);
  }, [showToast]);
  const errors = validateContact(normalizeContact(values));
  const valid = Object.keys(errors).length === 0;
  const fields = [
    {
      name: "email",
      type: "email",
      label: t["Your email"],
      autoComplete: "email",
    },
    {
      name: "phone",
      type: "tel",
      label: `${t["Your phone number"]} (${t.optional})`,
      autoComplete: "tel",
    },
    {
      name: "subject",
      type: "text",
      label: t.Subject,
      autoComplete: "off",
    },
    {
      name: "message",
      type: "text",
      label: t["Your message"],
      autoComplete: "off",
    },
  ] as const;
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || !valid) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizeContact(values)),
      });
      if (!response.ok) throw new Error("Contact delivery failed");
      const result = await response.json();
      if (result.error) throw new Error("Contact delivery failed");
      setStatus("success");
      setShowToast(true);
    } catch {
      setStatus("error");
      setShowToast(true);
    }
  }
  if (status === "success" || status === "error") {
    const success = status === "success";
    return (
      <div role={success ? "status" : "alert"}>
        <div className="section-pharagraph font-semibold flex gap-3 mb-4">
          <Icon
            name={success ? "success" : "error"}
            className={success ? "text-green-600" : "text-red-500"}
          />
          <span className="leading-6">
            {
              t[
                success
                  ? "contact-submit-success-title"
                  : "contact-submit-error-title"
              ]
            }
          </span>
        </div>
        <p className="section-pharagraph-small">
          {
            t[
              success
                ? "contact-submit-success-description"
                : "contact-submit-error-description"
            ]
          }
        </p>
        <div className="section-pharagraph-small mt-2">
          {success ? (
            <Link href={localePath("/", locale)} className={buttonClass}>
              <Icon name="left" />
              {t["Go back to homepage"]}
            </Link>
          ) : (
            <button
              type="button"
              className={buttonClass}
              onClick={() => {
                setStatus("idle");
                setShowToast(false);
              }}
            >
              <Icon name="reload" />
              {t["Try again"]}
            </button>
          )}
        </div>
        {showToast && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 max-w-[90vw] z-[60] rounded-xl px-5 py-3 shadow-lg text-white ${success ? "bg-green-700" : "bg-amber-700"}`}
          >
            {t[success ? "contact-submit-success" : "contact-submit-error"]}
          </div>
        )}
      </div>
    );
  }
  return (
    <form noValidate onSubmit={submit} aria-busy={status === "sending"}>
      {fields.map((field) => {
        const error = touched[field.name] ? errors[field.name] : undefined;
        const errorText =
          error === "invalidPhoneNumber"
            ? `${t.errorMessages.invalidPhoneNumber} (${t["must include a country code"]}, ${t.example}: +381611234567)`
            : error === "tooLong"
              ? locale === "sr"
                ? "Unos je predugačak"
                : "Input is too long"
              : error
                ? t.errorMessages[error]
                : undefined;
        const props = {
          id: `contact-${field.name}`,
          name: field.name,
          value: values[field.name],
          placeholder: field.label,
          autoComplete: field.autoComplete,
          maxLength: CONTACT_LIMITS[field.name],
          disabled: status === "sending",
          "aria-invalid": !!error,
          "aria-describedby": error ? `error-${field.name}` : undefined,
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            const value = event.target.value;
            setValues((current) => ({ ...current, [field.name]: value }));
          },
          onBlur: () =>
            setTouched((current) => ({ ...current, [field.name]: true })),
          className: `input-field ${field.name === "message" ? "h-36 md:h-40" : ""} ${error ? "invalid" : ""}`,
        };
        return (
          <div
            className={
              field.name === "message" ? "mb-4 md:mb-6" : "mb-2 md:mb-4"
            }
            key={field.name}
          >
            <label htmlFor={props.id} className="sr-only">
              {field.label}
            </label>
            {field.name === "message" ? (
              <textarea {...props} required />
            ) : (
              <input
                {...props}
                type={field.type}
                required={field.name !== "phone"}
              />
            )}
            {errorText && (
              <p className="text-red-500" id={`error-${field.name}`}>
                {errorText}
              </p>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        disabled={!valid || status === "sending"}
        className={`${primaryButtonClass} w-full px-4 py-3 font-semibold disabled:opacity-75 disabled:cursor-not-allowed`}
      >
        {status === "sending" && (
          <span
            aria-hidden="true"
            className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"
          />
        )}
        {t.Submit}
      </button>
    </form>
  );
}
