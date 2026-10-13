"use client";
import { usePathname } from "next/navigation";
import { dictionary } from "@/lib/i18n";
import { buttonClass, Container } from "@/components/site/Shared";
import { Icon } from "@/components/site/Icon";
export default function PageError({ reset }: { reset: () => void }) {
  const locale = /^\/sr(?:\/|$)/.test(usePathname() || "/") ? "sr" : "en";
  const t = dictionary(locale);
  return (
    <Container className="nav-top-padding pb-20">
      <div role="alert" className="text-center section-pharagraph">
        <h1 className="section-title">
          {locale === "sr"
            ? "Sadržaj trenutno nije dostupan"
            : "Content is temporarily unavailable"}
        </h1>
        <button type="button" onClick={reset} className={`${buttonClass} mt-6`}>
          <Icon name="reload" />
          {t["Try again"]}
        </button>
      </div>
    </Container>
  );
}
