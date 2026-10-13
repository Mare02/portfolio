"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import type { Locale } from "@/lib/i18n";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

export type GalleryImage = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function GalleryLightbox({
  images,
  name,
  locale,
  index,
  onClose,
  onView,
}: {
  images: GalleryImage[];
  name: string;
  locale: Locale;
  index: number;
  onClose: () => void;
  onView: (index: number) => void;
}) {
  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={images.map((image, index) => ({
        ...image,
        alt: image.alt || `${name} — ${index + 1}`,
        thumbnail: `${image.src}?w=240&fit=max&auto=format`,
      }))}
      plugins={images.length > 1 ? [Zoom, Thumbnails, Counter] : [Zoom]}
      carousel={{ finite: images.length === 1, imageFit: "contain" }}
      controller={{ closeOnBackdropClick: true }}
      thumbnails={{ width: 96, height: 64, imageFit: "contain" }}
      on={{ view: ({ index }) => onView(index) }}
      labels={
        locale === "sr"
          ? {
              Close: "Zatvori",
              Next: "Sledeća slika",
              Previous: "Prethodna slika",
              Lightbox: "Galerija projekta",
              Thumbnails: "Pregled slika",
              "Zoom in": "Uvećaj",
              "Zoom out": "Umanji",
            }
          : undefined
      }
      render={
        images.length === 1
          ? { buttonPrev: () => null, buttonNext: () => null }
          : undefined
      }
    />
  );
}
