"use client";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { iconButtonClass } from "./Shared";
import type { Locale } from "@/lib/i18n";
import { useModalDialog } from "./useModalDialog";
export function Gallery({
  images,
  name,
  locale,
}: {
  images: { src: string; alt?: string }[];
  name: string;
  locale: Locale;
}) {
  const { dialog, isOpen, open: openDialog, close, onClose } = useModalDialog();
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  if (!images.length) return null;
  const selectedIndex = Math.min(selected, images.length - 1);
  const currentImage = images[selectedIndex];
  const label = (en: string, sr: string) => (locale === "sr" ? sr : en);
  function open(index: number) {
    setSelected(index);
    setZoomed(false);
    openDialog();
  }
  function move(direction: number) {
    setSelected(
      (current) =>
        (Math.min(current, images.length - 1) + direction + images.length) %
        images.length,
    );
    setZoomed(false);
  }
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            onClick={() => open(index)}
            className="block aspect-square relative overflow-hidden rounded-lg border-2"
            aria-label={`${label("Open image", "Otvori sliku")} ${index + 1}: ${name}`}
          >
            <Image
              src={image.src}
              alt={image.alt || `${name} — ${index + 1}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-label={label("Project gallery", "Galerija projekta")}
        onClose={onClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10 text-white">
          <span className="text-sm">
            {selectedIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            className={`${iconButtonClass} !text-white hover:!bg-gray-700`}
            onClick={() => setZoomed(!zoomed)}
            aria-label={label("Toggle zoom", "Promeni uvećanje")}
            aria-pressed={zoomed}
          >
            <Icon name={zoomed ? "zoomOut" : "zoomIn"} />
          </button>
          <button
            type="button"
            className={`${iconButtonClass} !text-white hover:!bg-gray-700`}
            onClick={close}
            aria-label={label("Close gallery", "Zatvori galeriju")}
          >
            <Icon name="close" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => move(-1)}
          className={`${iconButtonClass} !text-white absolute left-2 z-10 bg-black/50`}
          aria-label={label("Previous image", "Prethodna slika")}
        >
          <Icon name="left" />
        </button>
        <div
          className="w-full h-full overflow-auto py-14 px-12"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className={`relative ${zoomed ? "w-[180vw] h-[180vh]" : "w-full h-full"}`}
          >
            {isOpen && (
              <Image
                src={currentImage.src}
                alt={currentImage.alt || `${name} — ${selectedIndex + 1}`}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          className={`${iconButtonClass} !text-white absolute right-2 z-10 bg-black/50`}
          aria-label={label("Next image", "Sledeća slika")}
        >
          <Icon name="right" />
        </button>
      </dialog>
    </>
  );
}
