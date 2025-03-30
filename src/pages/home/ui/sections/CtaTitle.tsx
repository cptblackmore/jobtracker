import { Typography as T } from '@mui/material';

interface Props {
  title: string;
}

export const CtaTitle: React.FC<Props> = ({ title }) => {
  return (
    <T 
      component='h2' 
      variant='h5' 
      mb={3} 
    >
      {title}
    </T>
  );
}
