"use client";
import { useEffect, useRef, useState } from "react";
import experiences from "@/data/myExperience.json";
import { dictionary, formatDate, type Locale } from "@/lib/i18n";
export function Timeline({ locale, now }: { locale: Locale; now: string }) {
  const t = dictionary(locale);
  const root = useRef<HTMLDivElement>(null);
  const [focusedDate, setFocusedDate] = useState(formatDate(now, locale));
  useEffect(() => {
    let frame = 0;
    function update() {
      const display = root.current?.querySelector(".displayDate");
      if (!display) return;
      const top = display.getBoundingClientRect().top;
      const marks = root.current?.querySelectorAll(".event-date-mark");
      let current = marks?.[0]?.textContent || "";
      marks?.forEach((mark) => {
        if (mark.getBoundingClientRect().top <= top)
          current = mark.textContent || current;
      });
      setFocusedDate(current);
    }
    function requestUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [locale, now]);
  return (
    <div ref={root} className="grid grid-cols-4">
      <div className="flex relative col-span-4 lg:col-span-3">
        <div
          className="w-1 h-full bg-gray-300 absolute left-[6px] top-0"
          aria-hidden="true"
        />
        <ol className="flex flex-col gap-10 z-10">
          {experiences.map((event) => {
            const start = new Date(`${event.date.from} 1 12:00:00 GMT`);
            const end = event.date.to
              ? new Date(`${event.date.to} 1 12:00:00 GMT`)
              : new Date(now);
            const middle = new Date((start.getTime() + end.getTime()) / 2);
            return (
              <li key={event.date.from} className="flex items-start">
                <div
                  className="flex items-center mt-8 shrink-0"
                  aria-hidden="true"
                >
                  <div className="w-4 h-4 bg-gray-400 rounded-full" />
                  <div className="w-5 md:w-10 h-1 bg-gray-300" />
                </div>
                <div className="flex min-w-0">
                  <article className="flex flex-col border-2 border-gray-300 bg-gray-100 dark:bg-slate-900 p-4 md:p-6 rounded-xl theme-transition">
                    <h3 className="main-section-pharagraph font-semibold">
                      {event.title[locale]}
                    </h3>
                    <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:gap-2 section-pharagraph">
                      <div className="flex flex-col sm:flex-row sm:gap-2 font-medium">
                        <span className="font-semibold gradient-text">
                          {event.workplace[locale]}
                        </span>
                        <span className="hidden md:block" aria-hidden="true">
                          |
                        </span>
                        <span>{event.location[locale]}</span>
                      </div>
                      <span className="hidden md:block" aria-hidden="true">
                        |
                      </span>
                      <div className="flex items-center gap-1 italic font-medium">
                        <span>{formatDate(event.date.from, locale)}</span>
                        <span>-</span>
                        <span>
                          {event.date.to
                            ? formatDate(event.date.to, locale)
                            : t.Present}
                        </span>
                      </div>
                    </div>
                    {/* HTML belongs to the existing checked-in experience copy. No CMS or user HTML is injected. */}
                    <div
                      className="mt-4 section-pharagraph"
                      dangerouslySetInnerHTML={{
                        __html: event.description[locale],
                      }}
                    />
                  </article>
                  <div
                    className="min-h-full flex flex-col justify-between w-0 invisible overflow-hidden"
                    aria-hidden="true"
                  >
                    {[end, middle, start].map((date, index) => (
                      <span className="event-date-mark" key={index}>
                        {formatDate(date, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="hidden lg:block h-full relative ml-10" aria-hidden="true">
        <div className="sticky top-1/2">
          <span className="font-semibold text-4xl text-gray-400 whitespace-nowrap italic displayDate">
            {focusedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
