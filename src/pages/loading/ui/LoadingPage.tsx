import { Box, CircularProgress, Container } from '@mui/material';
import { PageTitle } from '@widgets/PageTitle';

export const LoadingPage: React.FC = () => {
  return (
    <Container maxWidth='lg' >
      <Box 
        py={4}
        gap={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <PageTitle title='Идёт загрузка...' />
        <CircularProgress size={50} />
      </Box>
    </Container>
  );
};
