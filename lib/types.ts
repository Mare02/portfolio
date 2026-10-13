import type { PortableTextBlock } from "@portabletext/types";
import type { Locale } from "./i18n";
export type Localized<T> = Partial<Record<Locale, T>>;
export type SanityImage = {
  _key?: string;
  asset?: { _ref?: string; url?: string };
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
