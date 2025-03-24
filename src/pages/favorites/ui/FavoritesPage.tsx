  import { Box, Container } from '@mui/material';
  import { Nav } from '@widgets/Nav';
  import { FavoritesList } from '@widgets/FavoritesList';
import { PageTitle } from '@widgets/PageTitle';

  export const FavoritesPage: React.FC = () => {
    return (
      <Box>
        <Nav />
        <Container maxWidth='lg' >
          <Box my={4} >
            <PageTitle title='Избранные вакансии' />
            <FavoritesList />
          </Box>
        </Container>
      </Box>
    );
  };
