import Image from "next/image";
import config from "@/data/config.json";
import type { ReactNode } from "react";
const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 section-pharagraph-small hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";
export const buttonClass = `${buttonBaseClass} rounded-lg px-3 py-2`;
export const iconButtonClass = `${buttonBaseClass} rounded-full p-1.5`;
export const primaryButtonClass = `${buttonClass} bg-blue-600 dark:bg-white !text-white dark:!text-gray-800 hover:!bg-blue-700 dark:hover:!bg-gray-200`;
export function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 md:gap-6 ${className}`}>
      <a
        href={config.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="w-7 md:w-8 hover:opacity-80 transition-opacity dark:invert dark:brightness-0"
      >
        <Image
          src="/images/socials/github-mark.png"
          width={32}
          height={32}
          alt="github icon"
        />
      </a>
      <a
        href={config.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="w-7 md:w-8 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/images/socials/In-Blue-48.png"
          width={32}
          height={32}
          alt="linkedin icon"
        />
      </a>
    </div>
  );
}
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      id="main-content"
      className={`section-background min-h-screen ${className}`}
    >
      <div className="container mx-auto px-4 md:px-10">{children}</div>
    </main>
  );
}
export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="py-16 lg:py-32 flex flex-col justify-center">
      <h2 className="section-title mb-10 md:mb-20">{title}</h2>
      {children}
    </section>
  );
}
export function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/\\([^\\]*)\\/g).map((part, index) =>
        index % 2 ? (
          <span key={index} className="gradient-text">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
