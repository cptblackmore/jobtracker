import { Fade, FadeProps } from '@mui/material';
import { ReactElement, useState } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

interface Props {
  children: ReactElement;
  timeout?: FadeProps['timeout'];
  threshold?: IntersectionOptions['threshold'];
}

export const RevealOnScroll: React.FC<Props> = ({ children, timeout=300, threshold=0.2 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref } = useInView({
    threshold,
    onChange: (inView) => {
      if (inView) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  });

  return (
    <Fade ref={ref} in={isVisible} timeout={timeout} >
      <div>
        {children}
      </div>
    </Fade>
  );
}
