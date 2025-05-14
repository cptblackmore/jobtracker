import { hexToRgb } from "./hexToRgb";

export const blendColors = (
  baseColor: string,
  overlayColor: string,
  overlayAlpha: number,
) => {
  const base = hexToRgb(baseColor);
  const overlay = hexToRgb(overlayColor);

  const r = Math.round(base.r * (1 - overlayAlpha) + overlay.r * overlayAlpha);
  const g = Math.round(base.g * (1 - overlayAlpha) + overlay.g * overlayAlpha);
  const b = Math.round(base.b * (1 - overlayAlpha) + overlay.b * overlayAlpha);

  return `${r}, ${g}, ${b}`;
};
