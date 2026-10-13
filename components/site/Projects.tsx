"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { localized, safeExternalUrl, type Project } from "@/lib/types";
import { Icon } from "./Icon";
import { iconButtonClass } from "./Shared";
export function Projects({
  projects,
  locale,
}: {
  projects: { project: Project; image?: string }[];
  locale: Locale;
}) {
  const t = dictionary(locale);
  const [view, setView] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        if (localStorage.getItem("resourceView") === "list") setView("list");
      } catch {}
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  function changeView(next: "grid" | "list") {
    setView(next);
    try {
      localStorage.setItem("resourceView", next);
    } catch {}
  }
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => changeView("grid")}
          className={`${iconButtonClass} ${view === "grid" ? "bg-gray-200 dark:bg-slate-600" : ""}`}
          aria-label={locale === "sr" ? "Prikaz mreže" : "Grid view"}
          aria-pressed={view === "grid"}
        >
          <Icon name="grid" />
        </button>
        <button
          type="button"
          onClick={() => changeView("list")}
          className={`${iconButtonClass} ${view === "list" ? "bg-gray-200 dark:bg-slate-600" : ""}`}
          aria-label={locale === "sr" ? "Prikaz liste" : "List view"}
          aria-pressed={view === "list"}
        >
          <Icon name="list" />
        </button>
      </div>
      {projects.length === 0 && (
        <p className="section-pharagraph py-8">
          {locale === "sr"
            ? "Trenutno nema projekata."
            : "There are no projects yet."}
        </p>
      )}
      <div
        className={`grid py-8 gap-6 lg:gap-8 ${view === "grid" ? "md:grid-cols-2" : ""}`}
      >
        {projects.map(({ project, image }) => {
          const name = localized(project.name, locale) || "";
          const slug = project.slug?.en?.current;
          const path = slug
            ? localePath(`/projects/${encodeURIComponent(slug)}`, locale)
            : undefined;
          const website = safeExternalUrl(
            localized(project.websiteUrl, locale),
          );
          const code = safeExternalUrl(project.sourceCodeUrl);
          return (
            <article
              key={project._id}
              className={`group relative flex rounded-2xl overflow-hidden border-2 h-full ${view === "grid" ? "flex-col" : "flex-col sm:flex-row bg-gray-100 dark:bg-slate-900"}`}
            >
              <div
                className={`relative overflow-hidden shrink-0 aspect-video ${view === "list" ? "w-full sm:w-1/3 lg:w-1/4 sm:self-center" : "w-full"}`}
              >
                {image && (
                  <Image
                    src={image}
                    alt={name}
                    fill
                    unoptimized
                    sizes={
                      view === "list"
                        ? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                        : "(min-width: 768px) 50vw, 100vw"
                    }
                    className={
                      view === "list"
                        ? "object-contain"
                        : "object-cover transition-transform duration-300 group-hover:scale-105"
                    }
                  />
                )}
              </div>
              <div
                className={`bg-gray-100 dark:bg-slate-900 p-4 md:p-6 theme-transition min-w-0 ${view === "grid" ? "w-full border-t-2" : "flex-1 flex flex-col justify-center border-t-2 sm:border-t-0"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="section-pharagraph font-semibold gradient-text min-w-0 break-words">
                    {path ? (
                      <Link
                        href={path}
                        className="hover:underline after:absolute after:inset-0"
                      >
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </h2>
                  <div className="flex shrink-0 items-center gap-1">
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconButtonClass} relative z-10`}
                        aria-label={`${t.Website}: ${name}`}
                      >
                        <Icon name="web" />
                      </a>
                    )}
                    {code && (
                      <a
                        href={code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconButtonClass} relative z-10`}
                        aria-label={`${t.Code}: ${name}`}
                      >
                        <Icon name="code" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="section-pharagraph-small">
                  {localized(project.description, locale)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
