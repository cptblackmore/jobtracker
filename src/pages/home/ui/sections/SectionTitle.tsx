import { Typography as T } from '@mui/material';

interface Props {
  title: string;
}

export const SectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <T 
      component='h2' 
      variant='h4' 
      align='center' 
      mb={{xs: 2, sm: 4}} 
      sx={(theme) => ({
        fontSize: {
          xs: '1.8rem',
          sm: {fontSize: theme.typography.h4.fontSize}
        }
      })}
    >
      {title}
    </T>
  );
}
