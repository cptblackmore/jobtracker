import { Box, CircularProgress, Container, Typography as T } from '@mui/material';
import { Nav } from '@widgets/Nav';

export const LoadingPage: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Container >
        <Box display='flex' flexDirection='column' alignItems='center' gap={2} marginTop={5} >
          <T variant="h4" >Подождите, идёт загрузка</T>
          <CircularProgress size={50} />
        </Box>
      </Container>
    </Box>
  );
};
