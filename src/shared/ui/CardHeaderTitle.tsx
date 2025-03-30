import { Typography as T } from '@mui/material';

interface Props {
  title: string; 
}

export const CardHeaderTitle: React.FC<Props> = ({ title }) => {
  return (
    <T component='h2' variant='h6' >
      {title}
    </T>
  );
}
