import { useState } from 'react';
import { css, Keyframes, SerializedStyles } from '@emotion/react';

export const useTriggerAnimation = (keyframes: Keyframes, duration: string, easing: string) => {
  const [animationStyle, setAnimationStyle] = useState<SerializedStyles | null>(null);

  const trigger = () => {
    setAnimationStyle(null);
    requestAnimationFrame(() => {
      setAnimationStyle(css`
        animation: ${keyframes} ${duration} ${easing};
      `);
    });
  };

  return [animationStyle, trigger] as const;
}
