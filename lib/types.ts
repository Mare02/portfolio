import type { PortableTextBlock } from "@portabletext/types";
import type { Locale } from "./i18n";
export type Localized<T> = Partial<Record<Locale, T>>;
export type SanityImage = {
  asset?: { _ref?: string };
  alt?: string;
};
export type Project = {
  _id: string;
  name?: Localized<string>;
  description?: Localized<string>;
  slug?: Localized<{ current: string }>;
  coverImage?: SanityImage;
  images?: SanityImage[];
  websiteUrl?: Localized<string>;
  sourceCodeUrl?: string;
  htmlContent?: Localized<PortableTextBlock[]>;
};
export function localized<T>(
  value: Localized<T> | undefined,
  locale: Locale,
): T | undefined {
  return value?.[locale] ?? value?.en;
}
export function safeExternalUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function safeContentUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const base = "https://portfolio.invalid";
  try {
    const url = new URL(value, base);
    if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol))
      return undefined;
    // Preserve relative paths and fragments so they resolve against the current page.
    return url.origin === base && !/^[a-z][a-z\d+.-]*:/i.test(value.trim())
      ? value
      : url.href;
  } catch {
    return undefined;
  }
}
