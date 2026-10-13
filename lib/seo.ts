import type { Metadata } from "next";
import { dictionary, localePath, type Locale } from "./i18n";

export function siteOrigin(): URL {
  const domain =
    process.env.PROD_DOMAIN ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  try {
    return new URL(domain.includes("://") ? domain : `https://${domain}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}
export function metadata(
  locale: Locale,
  page: "index" | "contact" | "projects",
  path: string,
): Metadata {
  const copy = dictionary(locale).seo[page];
  return pageMetadata(locale, path, copy.title, copy.description);
}
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image?: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localePath(path, locale),
      languages: {
        en: localePath(path, "en"),
        sr: localePath(path, "sr"),
        "x-default": path,
      },
    },
    openGraph: {
      title,
      description,
      url: localePath(path, locale),
      type: "website",
      locale: locale === "sr" ? "sr_RS" : "en_US",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
