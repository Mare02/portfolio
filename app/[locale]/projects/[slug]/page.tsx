import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { dictionary, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import {
  getProjectBySlug,
  sanityImageUrl,
  projectCoverUrl,
} from "@/lib/sanity";
import { localized, safeExternalUrl, safeContentUrl } from "@/lib/types";
import { buttonClass, Container } from "@/components/site/Shared";
import { Icon } from "@/components/site/Icon";
import { Gallery } from "@/components/site/Gallery";
type Props = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return pageMetadata(
    locale,
    `/projects/${encodeURIComponent(slug)}`,
    localized(project.name, locale) || "Project",
    localized(project.description, locale) || "",
    projectCoverUrl(project),
  );
}
const components: Partial<PortableTextComponents> = {
  marks: {
    link: ({ value, children }) => {
      const href = safeContentUrl(value?.href);
      return href ? (
        <a
          href={href}
          target={/^https?:\/\//i.test(href) ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};
export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const t = dictionary(locale);
  const name = localized(project.name, locale) || "Project";
  const cover = projectCoverUrl(project);
  const website = safeExternalUrl(localized(project.websiteUrl, locale));
  const code = safeExternalUrl(project.sourceCodeUrl);
  const content = localized(project.htmlContent, locale);
  const images = (project.images || []).flatMap((image) => {
    const src = sanityImageUrl(image);
    const dimensions = image.asset?._ref?.match(/-(\d+)x(\d+)-/);
    return src
      ? [
          {
            src,
            alt: image.alt,
            width: dimensions ? Number(dimensions[1]) : undefined,
            height: dimensions ? Number(dimensions[2]) : undefined,
          },
        ]
      : [];
  });
  return (
    <Container className="nav-top-padding pb-20">
      {cover && (
        <div className="w-full h-48 md:h-72 relative overflow-hidden rounded-2xl border-2">
          <Image
            src={cover}
            alt={name}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-20 mt-8 mb-4 md:mb-6">
        <h1 className="section-title !min-w-0 break-words gradient-text">
          {name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} border-2`}
            >
              <Icon name="web" />
              {t.Website}
            </a>
          )}
          {code && (
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} border-2`}
            >
              <Icon name="code" />
              {t.Code}
            </a>
          )}
        </div>
      </div>
      <p className="section-pharagraph mb-4 md:mb-6">
        {localized(project.description, locale)}
      </p>
      {!!images.length && (
        <section className="py-4 mb-4 md:mb-6">
          <h2 className="section-pharagraph mb-3 underline">
            {t["Project gallery"]}
          </h2>
          <Gallery images={images} name={name} locale={locale} />
        </section>
      )}
      {!!content?.length && (
        <div className="prose dark:prose-invert dark:text-gray-200 max-w-full">
          <PortableText value={content} components={components} />
        </div>
      )}
    </Container>
  );
}
