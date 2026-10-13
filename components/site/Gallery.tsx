"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "./Icon";
import { iconButtonClass } from "./Shared";
import type { Locale } from "@/lib/i18n";
import type { GalleryImage } from "./GalleryLightbox";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
  ssr: false,
});

export function Gallery({
  images,
  name,
  locale,
}: {
  images: GalleryImage[];
  name: string;
  locale: Locale;
}) {
  const [viewport, carousel] = useEmblaCarousel({
    loop: images.length > 1,
    // Restoring lightbox focus must not select the original slide again.
    watchFocus: false,
  });
  const [selected, setSelected] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);
  const slideButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const label = (en: string, sr: string) => (locale === "sr" ? sr : en);

  useEffect(() => {
    if (!carousel) return;
    const update = () => {
      const index = carousel.selectedScrollSnap();
      setSelected(index);
      if (slideButtons.current.some((button) => button === document.activeElement)) {
        slideButtons.current[index]?.focus({ preventScroll: true });
      }
      // Scroll only the thumbnail strip, without moving the page.
      const thumbnail = thumbnails.current[index];
      const strip = thumbnail?.parentElement;
      if (thumbnail && strip) {
        strip.scrollTo({
          left:
            thumbnail.offsetLeft -
            strip.offsetLeft -
            (strip.clientWidth - thumbnail.clientWidth) / 2,
        });
      }
    };
    update();
    carousel.on("select", update).on("reInit", update);
    return () => {
      carousel.off("select", update).off("reInit", update);
    };
  }, [carousel]);

  if (!images.length) return null;

  return (
    <div
      role="region"
      aria-roledescription={label("carousel", "karusel")}
      aria-label={`${label("Project gallery", "Galerija projekta")}: ${name}`}
      onKeyDown={(event) => {
        if (lightboxIndex !== null) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          if (event.key === "ArrowRight") carousel?.scrollNext();
          else carousel?.scrollPrev();
        }
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-100 dark:border-slate-700 dark:bg-slate-900">
        <div ref={viewport} className="overflow-hidden">
          <div className="flex [touch-action:pan-y_pinch-zoom]">
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="min-w-0 flex-[0_0_100%]"
                role="group"
                aria-roledescription={label("slide", "slajd")}
                aria-label={`${index + 1} / ${images.length}`}
                aria-hidden={index !== selected}
              >
                <button
                  type="button"
                  ref={(element) => {
                    slideButtons.current[index] = element;
                  }}
                  tabIndex={index === selected ? 0 : -1}
                  onClick={() => setLightboxIndex(index)}
                  className="relative block aspect-[4/3] w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-500 md:aspect-video"
                  aria-label={`${label("Open image", "Otvori sliku")} ${index + 1}: ${name}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `${name} — ${index + 1}`}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    draggable={false}
                    className="object-contain p-2 md:p-4"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => carousel?.scrollPrev()}
              className={`${iconButtonClass} absolute left-2 top-1/2 -translate-y-1/2 min-h-11 min-w-11 border border-gray-200 bg-white/90 shadow-sm dark:border-slate-600 dark:bg-slate-800/90`}
              aria-label={label("Previous image", "Prethodna slika")}
            >
              <Icon name="left" />
            </button>
            <button
              type="button"
              onClick={() => carousel?.scrollNext()}
              className={`${iconButtonClass} absolute right-2 top-1/2 -translate-y-1/2 min-h-11 min-w-11 border border-gray-200 bg-white/90 shadow-sm dark:border-slate-600 dark:bg-slate-800/90`}
              aria-label={label("Next image", "Sledeća slika")}
            >
              <Icon name="right" />
            </button>
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 section-pharagraph-small text-sm">
        <span>
          {label("Click image to enlarge", "Klikni na sliku za uvećanje")}
        </span>
        <span aria-live="polite" aria-atomic="true">
          {selected + 1} / {images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div
          className="relative mt-3 flex gap-2 overflow-x-auto py-1"
          aria-label={label("Choose an image", "Izaberi sliku")}
        >
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              ref={(element) => {
                thumbnails.current[index] = element;
              }}
              type="button"
              onClick={() => carousel?.scrollTo(index)}
              aria-label={`${label("Show image", "Prikaži sliku")} ${index + 1}: ${name}`}
              aria-pressed={index === selected}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:bg-slate-900 ${index === selected ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="96px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          name={name}
          locale={locale}
          index={lightboxIndex}
          onClose={() => {
            setLightboxIndex(null);
            slideButtons.current[
              carousel?.selectedScrollSnap() ?? selected
            ]?.focus({ preventScroll: true });
          }}
          onView={(index) => carousel?.scrollTo(index, true)}
        />
      )}
    </div>
  );
}
