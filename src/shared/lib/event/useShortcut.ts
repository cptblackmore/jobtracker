import { useEffect } from "react";

interface ShortcutOptions {
  action: () => void;
  key: string;
  altKey?: boolean;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  preventDefault?: boolean;
}

export function useShortcut({
  action,
  key,
  altKey = false,
  shiftKey = false,
  ctrlKey = false,
  preventDefault = true,
}: ShortcutOptions) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const match =
        e.key.toLowerCase() === key.toLowerCase() &&
        e.altKey === altKey &&
        e.shiftKey === shiftKey &&
        e.ctrlKey === ctrlKey;

      if (match) {
        if (preventDefault) e.preventDefault();

        action();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [action, key, altKey, shiftKey, ctrlKey, preventDefault]);
}
