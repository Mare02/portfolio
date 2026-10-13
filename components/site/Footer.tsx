import Link from "next/link";
import config from "@/data/config.json";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { Socials } from "./Shared";
export function Footer({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <footer className="bg-gray-200 dark:bg-slate-800 border-t border-gray-500 dark:text-white py-8 theme-transition">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">{config.full_name}</h3>
            <p className="text-sm mt-1">{config.job_title}</p>
          </div>
          <Socials />
          <nav
            aria-label={
              locale === "sr" ? "Navigacija u podnožju" : "Footer navigation"
            }
            className="flex items-center gap-4 justify-center md:justify-end"
          >
            <Link className="underline" href={localePath("/", locale)}>
              {t.Home}
            </Link>
            <span aria-hidden="true">•</span>
            <Link className="underline" href={localePath("/contact", locale)}>
              {t.Contact}
            </Link>
            <span aria-hidden="true">•</span>
            <Link className="underline" href={localePath("/projects", locale)}>
              {t.Projects}
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm theme-transition">
            © {new Date().getFullYear()} {config.full_name}.{" "}
            {t["All right reserved"]}.
          </p>
        </div>
      </div>
    </footer>
  );
}
