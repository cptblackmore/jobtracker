import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';

interface Props {
  onClick?: () => void;
}

export const ScrollToTopButton: React.FC<Props> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Fab
      color='primary'
      onClick={onClick ?? scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        transition: 'opacity 0.2s ease-in-out, background 0.2s ease-in',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-label='Переместиться наверх'
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};
