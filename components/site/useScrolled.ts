"use client";
import { useEffect, useState } from "react";

export function useScrolled(distance: number) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > distance);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [distance]);
  return scrolled;
}
