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
      mb={4} 
    >
      {title}
    </T>
  );
}
