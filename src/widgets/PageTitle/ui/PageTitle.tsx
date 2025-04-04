import { Typography as T } from '@mui/material';

interface Props {
  title: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <T
      component='h1'
      variant='h2' 
      align='left'
      gutterBottom
      ml={{xs: 1, sm: 2}}
      sx={(theme) => ({
        fontSize: {
          xs: '1.6rem',
          sm: theme.typography.h2.fontSize
        }
      })}
    >
      {title}
    </T>
  );
}
