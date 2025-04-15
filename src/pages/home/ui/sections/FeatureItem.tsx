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
        '&:hover': {
          bgcolor: (theme) => theme.palette.primary.main
        },
        '&:focus': {
          bgcolor: (theme) => theme.palette.primary.main,
          outline: 'none'
        }
      }}
      tabIndex={0}
      role='listitem'
      aria-label={text}
    >
      {icon}
      <T 
        variant='body1' 
        px={1} 
        sx={(theme) => ({
          fontSize: {
            xs: '0.9rem',
            sm: {fontSize: theme.typography.body1.fontSize}
          }
        })}
      >
        {text}
      </T>
    </Box>
  );
}
