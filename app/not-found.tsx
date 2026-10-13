import { headers } from "next/headers";
import { NotFoundPage } from "@/components/site/NotFound";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
export default async function NotFound() {
  const locale = (await headers()).get("x-site-locale") === "sr" ? "sr" : "en";
  return (
    <>
      <Navbar locale={locale} />
      <NotFoundPage locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
