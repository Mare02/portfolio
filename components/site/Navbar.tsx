"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import config from "@/data/config.json";
import {
  dictionary,
  localePath,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { Icon } from "./Icon";
import { buttonClass, iconButtonClass } from "./Shared";
import { useScrolled } from "./useScrolled";
import { useModalDialog } from "./useModalDialog";

function ThemeSwitcher({ locale }: { locale: Locale }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      let preference = "system";
      try {
        preference = localStorage.getItem("nuxt-color-mode") || "system";
      } catch {}
      const dark =
        preference === "dark" || (preference === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.classList.toggle("light", !dark);
    };
    media.addEventListener("change", update);
    window.addEventListener("storage", update);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  function toggle() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
    try {
      localStorage.setItem("nuxt-color-mode", dark ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      className={iconButtonClass}
      aria-label={locale === "sr" ? "Promeni temu" : "Toggle theme"}
    >
      <Icon name="sun" />
    </button>
  );
}

function LocaleSwitcher({
  locale,
  showName = false,
}: {
  locale: Locale;
  showName?: boolean;
}) {
  const path = usePathname() || "/";
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!details.current?.contains(event.target as Node))
        details.current?.removeAttribute("open");
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") details.current?.removeAttribute("open");
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <details ref={details} className="relative h-fit locale-switcher">
      <summary
        className={`${iconButtonClass} list-none cursor-pointer ${showName ? "px-3" : ""}`}
        aria-label={locale === "sr" ? "Promeni jezik" : "Change language"}
      >
        <Icon name="translate" />
        {showName && (
          <span className="ml-2 font-medium">
            {locale === "sr" ? "Srpski" : "English"}
          </span>
        )}
      </summary>
      <div
        className={`absolute py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded shadow-lg z-10 ${showName ? "left-0" : "right-0"}`}
      >
        {(["en", "sr"] as const).map((option) => (
          <a
            key={option}
            href={switchLocalePath(path, option)}
            onClick={() => {
              document.cookie = `site-locale=${option};path=/;max-age=31536000;SameSite=Lax`;
              details.current?.removeAttribute("open");
            }}
            hrefLang={option}
            lang={option}
            className={`flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 whitespace-nowrap ${option === locale ? "bg-indigo-100 dark:bg-cyan-800" : "hover:bg-indigo-50 dark:hover:bg-cyan-900"}`}
          >
            <Image
              width={24}
              height={16}
              className="w-6 h-auto"
              src={`/svg-icons/${option}.svg`}
              alt=""
            />
            <span>{option === "sr" ? "Srpski" : "English"}</span>
          </a>
        ))}
      </div>
    </details>
  );
}

export function Navbar({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  const scrolled = useScrolled(80);
  const path = switchLocalePath(usePathname() || "/", locale);
  const { dialog, open, close, onClose } = useModalDialog();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (desktop.matches) close();
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, [close]);
  const links = [
    { path: "/", label: t.Home, icon: "home" },
    { path: "/contact", label: t.Contact, icon: "email" },
    { path: "/projects", label: t["My projects"], icon: "code" },
  ] as const;
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "top-0" : "top-0 sm:top-6"}`}
    >
      <div
        className={`w-full py-3 shadow-md bg-white dark:bg-slate-800 theme-transition ${scrolled ? "" : "sm:rounded-full sm:container sm:mx-auto md:shadow-xl md:shadow-blue-200 dark:md:shadow-cyan-900"}`}
      >
        <div className="container px-4 md:px-10 mx-auto flex items-center justify-between">
          <Link
            href={localePath("/", locale)}
            className="flex items-center gap-2 leading-5 font-semibold section-pharagraph-small"
          >
            <span className="rounded-full overflow-hidden border-2 border-gray-300 flex">
              <Image
                src="/images/profile.jpeg"
                alt="profile"
                width={40}
                height={40}
                className="w-10 h-10 object-cover"
              />
            </span>
            <span>{config.full_name}</span>
          </Link>
          <nav
            aria-label={
              locale === "sr" ? "Glavna navigacija" : "Main navigation"
            }
            className="hidden md:flex items-center"
          >
            {links
              .slice(1)
              .reverse()
              .map((link) => (
                <Link
                  key={link.path}
                  href={localePath(link.path, locale)}
                  className={`${buttonClass} mr-2 hover:underline`}
                  aria-current={
                    path === localePath(link.path, locale) ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            <LocaleSwitcher locale={locale} />
            <div className="ml-2">
              <ThemeSwitcher locale={locale} />
            </div>
          </nav>
          <button
            type="button"
            className={`${iconButtonClass} md:hidden`}
            onClick={open}
            aria-label={locale === "sr" ? "Otvori meni" : "Open menu"}
            aria-haspopup="dialog"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="sidebar-dialog"
        aria-label={locale === "sr" ? "Navigacija" : "Navigation"}
      >
        <div className="sidebar-panel bg-white dark:bg-slate-800 h-full w-4/5 sm:w-2/3 relative overflow-y-auto shadow-lg">
          <div className="bg-gray-200 dark:bg-slate-700 px-4 pl-7 py-8 flex items-center gap-2">
            <Image
              src="/images/profile.jpeg"
              alt="profile"
              width={48}
              height={48}
              className="rounded-full border-2 border-gray-300 w-12 h-12 object-cover"
            />
            <div className="section-pharagraph-small flex flex-col">
              <span className="font-semibold">{config.full_name}</span>
              <span>{t["Personal Website"]}</span>
            </div>
            <button
              type="button"
              onClick={close}
              className={`${iconButtonClass} ml-auto`}
              aria-label={locale === "sr" ? "Zatvori meni" : "Close menu"}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="flex flex-col items-start gap-2 px-4 py-2">
            <LocaleSwitcher locale={locale} showName />
            <hr className="h-0.5 bg-gray-200 w-full" />
            {links.map((link) => (
              <Link
                key={link.path}
                onClick={close}
                href={localePath(link.path, locale)}
                className={`${buttonClass} w-full justify-start ${path === localePath(link.path, locale) ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                aria-current={
                  path === localePath(link.path, locale) ? "page" : undefined
                }
              >
                <Icon name={link.icon} />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 pl-7 pb-5">
            <ThemeSwitcher locale={locale} />
          </div>
        </div>
      </dialog>
    </header>
  );
}
