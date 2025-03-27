import { Box, CircularProgress, Container } from '@mui/material';

interface Props {
  variant?: 'light' | 'contrast';
}

export const LoadingSection: React.FC<Props> = ({ variant='light' }) => {
  return (
    <Box
      component='section'
      sx={variant === 'contrast' ? (
        {
          backgroundColor: (theme) => theme.palette.primary.dark, 
          color: (theme) => theme.palette.primary.contrastText
        }
      ) : null}
    >
      <Container maxWidth='sm' >
        <Box 
          display='flex'
          justifyContent='center'
          alignItems='center'
          p={8} 
        >
          <CircularProgress size='5em' />
        </Box>
      </Container>
    </Box>
  );
}
