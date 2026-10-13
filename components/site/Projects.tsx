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
        data-testid="projects"
        data-view={view}
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
              className={`relative flex rounded-2xl overflow-hidden border-2 h-full ${view === "grid" ? "flex-col" : ""}`}
            >
              <div
                className={`relative overflow-hidden shrink-0 ${view === "list" ? "w-1/3 md:w-1/4" : "w-full aspect-video"}`}
              >
                {image &&
                  (path ? (
                    <Link
                      href={path}
                      aria-label={name}
                      className="block h-full min-h-32"
                    >
                      <Image
                        src={image}
                        alt={name}
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      unoptimized
                      sizes="50vw"
                      className="object-cover"
                    />
                  ))}
              </div>
              <div
                className={`bg-gray-100 dark:bg-slate-900 p-4 md:p-6 theme-transition w-full min-w-0 ${view === "grid" ? "border-t-2" : ""}`}
              >
                <div
                  className={`flex gap-2 ${view === "list" ? "flex-col sm:flex-row sm:items-center sm:justify-between" : "items-center justify-between"}`}
                >
                  <h2 className="section-pharagraph font-semibold gradient-text break-words">
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
                  <div className="flex items-start gap-1">
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
