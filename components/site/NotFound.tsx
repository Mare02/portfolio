import Link from "next/link";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { primaryButtonClass, Container } from "./Shared";
import { Icon } from "./Icon";
export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <Container className="nav-top-padding pb-10">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4 gradient-text">404</h1>
        <h2 className="section-title">{t.errorPage.title}</h2>
        <p className="section-pharagraph my-6">{t.errorPage.description}</p>
        <div className="flex justify-center">
          <Link href={localePath("/", locale)} className={primaryButtonClass}>
            <Icon name="home" />
            {t.errorPage.goHome}
          </Link>
        </div>
      </div>
    </Container>
  );
}
