import { useEffect, useState } from 'react';

export const useHideNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY = window.scrollY > 0 ? window.scrollY : 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isVisible }
}
