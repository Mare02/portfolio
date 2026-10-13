import Image from "next/image";
import { notFound } from "next/navigation";
import config from "@/data/config.json";
import { dictionary, isLocale } from "@/lib/i18n";
import { metadata } from "@/lib/seo";
import { Container, Socials } from "@/components/site/Shared";
import { Icon } from "@/components/site/Icon";
import { ContactForm } from "@/components/site/ContactForm";
import contact from "@/public/images/contact.png";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return metadata(locale, "contact", "/contact");
}
export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary(locale);
  return (
    <div className="main-section-background">
      <Container className="nav-top-padding pb-20">
        <div className="flex items-center gap-10 md:gap-20 md:mb-6">
          <h1 className="section-title !min-w-0">{t["Contact me"]}</h1>
          <Socials className="ml-auto shrink-0 max-md:hidden" />
        </div>
        <div className="flex justify-between flex-wrap mt-2 md:mb-5 gap-2">
          <div className="flex flex-col md:flex-row md:gap-6 gap-1 lg:text-lg mb-2">
            <div className="flex items-center gap-2 section-pharagraph-small underline">
              <Icon name="email" />
              <a className="break-all" href={`mailto:${config.email}`}>
                {config.email}
              </a>
            </div>
            <div className="flex items-center gap-2 section-pharagraph-small underline">
              <Icon name="phone" />
              <a href={`tel:${config.phone}`}>{config.phone}</a>
            </div>
          </div>
          <Socials className="ml-auto shrink-0 md:hidden" />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-5 lg:gap-20">
          <div className="md:w-1/3">
            <Image
              src={contact}
              sizes="(min-width: 768px) 33vw, 176px"
              className="h-44 w-auto md:h-auto md:w-full"
              alt="a guy handling computers"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl border-4 border-gray-200 dark:border-slate-700 theme-transition">
            <ContactForm key={locale} locale={locale} />
          </div>
        </div>
      </Container>
    </div>
  );
}
