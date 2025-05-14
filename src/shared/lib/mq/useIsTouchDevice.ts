import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
  const getIsTouch = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const [isTouch, setIsTouch] = useState(getIsTouch);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");

    const handler = () => setIsTouch(mq.matches);

    mq.addEventListener?.("change", handler);

    return () => {
      mq.removeEventListener?.("change", handler);
    };
  }, []);

  return isTouch;
};
