import { Box } from '@mui/material';
import { Typography as T } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  text: string;
}

export const FeatureItem: React.FC<Props> = ({ icon, text }) => {
  return (
    <Box 
      display='flex'
      textAlign='start' 
      alignItems='center' 
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.primary.contrastText}`, 
        p: 1,
        transition: 'background 0.5s',
        '&:hover': {bgcolor: (theme)  => theme.palette.primary.main},
      }}
    >
      {icon}
      <T variant='body1' px={1} >
        {text}
      </T>
    </Box>
  );
}
