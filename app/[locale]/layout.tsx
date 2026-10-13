import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LocaleDocument } from "@/components/site/LocaleDocument";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <LocaleDocument locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:p-3"
      >
        {locale === "sr" ? "Pređi na sadržaj" : "Skip to content"}
      </a>
      <Navbar key={locale} locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
