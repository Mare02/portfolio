"use client";
import { useScrolled } from "./Navbar";
export function ScrollIndicator() {
  const scrolled = useScrolled(200);
  return scrolled ? null : (
    <div
      className="absolute bottom-32 left-0 right-0 flex justify-center"
      aria-hidden="true"
    >
      <div className="scroll-indicator" />
    </div>
  );
}
