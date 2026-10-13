"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useModalDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const open = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => dialog.current?.close(), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  return { dialog, isOpen, open, close, onClose };
}
