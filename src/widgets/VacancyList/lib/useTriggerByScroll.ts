import { useEffect, useState } from 'react';

export const useTriggerByScroll = (distanceToTrigger = 1000) => {
  const [scrolledEnough, setScrolledEnough] = useState(false);

  useEffect(() => {
    if (scrolledEnough) return

    const handler = () => {
      if (window.scrollY >= distanceToTrigger) {
        setScrolledEnough(true);
        window.removeEventListener('scroll', handler);
      }
    }

    window.addEventListener('scroll', handler, {passive: true});
    return () => window.removeEventListener('scroll', handler);
  }, [scrolledEnough, distanceToTrigger]);

  return scrolledEnough;
}
