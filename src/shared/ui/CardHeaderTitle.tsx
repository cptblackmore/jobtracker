import { Typography as T } from '@mui/material';

interface Props {
  title: string; 
}

export const CardHeaderTitle: React.FC<Props> = ({ title }) => {
  return (
    <T component='h2' variant='h6' sx={(theme) => ({fontSize: {xs: '1.2rem', sm: {fontSize: theme.typography.h6.fontSize}}})} >
      {title}
    </T>
  );
}
