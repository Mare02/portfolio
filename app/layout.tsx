import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "./globals.css";
import { siteOrigin } from "@/lib/seo";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  icons: { icon: "/favicon.ico" },
};
const themeScript = `try{var p=localStorage.getItem('nuxt-color-mode')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('light');}`;
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = (await headers()).get("x-site-locale") === "sr" ? "sr" : "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-ibmsans">{children}</body>
    </html>
  );
}
