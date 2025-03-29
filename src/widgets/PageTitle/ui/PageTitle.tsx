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
      ml={2}
    >
      {title}
    </T>
  );
}
