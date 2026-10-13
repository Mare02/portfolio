import en from "@/lang/en.json";
import sr from "@/lang/sr.json";

export const locales = ["en", "sr"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export function dictionary(locale: Locale) {
  return locale === "sr" ? sr : en;
}
export function localePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "sr"
    ? `/sr${normalized === "/" ? "" : normalized}`
    : normalized;
}
export function switchLocalePath(path: string, locale: Locale): string {
  return localePath(path.replace(/^\/(?:sr|en)(?=\/|$)/, "") || "/", locale);
}
export function preferredLocale(header: string | null): Locale {
  const languages = (header ?? "")
    .split(",")
    .map((entry) => {
      const [language, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((part) => part.trim().startsWith("q="));
      return {
        language: language.toLowerCase().split("-")[0],
        quality: quality ? Number(quality.trim().slice(2)) : 1,
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
  return (
    (languages.find((entry) => isLocale(entry.language))?.language as Locale) ||
    "en"
  );
}
export function formatDate(date: string | Date, locale: Locale) {
  // Source dates use English month names; explicitly parse them consistently on server and browser.
  const parsed =
    typeof date === "string" && /^[A-Za-z]+ \d{4}$/.test(date)
      ? new Date(`${date} 1 12:00:00 GMT`)
      : new Date(date);
  return parsed.toLocaleDateString(locale === "sr" ? "sr-Latn-RS" : "en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
