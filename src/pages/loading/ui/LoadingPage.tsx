import { Box, CircularProgress, Container } from '@mui/material';
import { PageTitle } from '@widgets/PageTitle';

export const LoadingPage: React.FC = () => {
  return (
    <Container maxWidth='lg' >
      <Box 
        py={{xs: 2, sm: 4}}
        gap={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        role='status'
        aria-busy='true'
        aria-label='Пожалуйста, подождите'
      >
        <PageTitle title='Идёт загрузка...' />
        <CircularProgress size={50} aria-hidden='true' />
      </Box>
    </Container>
  );
};
