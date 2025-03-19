  import { Box, Container, Typography as T } from '@mui/material';
  import { Nav } from '@widgets/Nav';
  import { FavoritesList } from '@widgets/FavoritesList';

  export const FavoritesPage: React.FC = () => {
    return (
      <Box>
        <Nav />
        <Container maxWidth="md">
          <Box sx={{ padding: 3 }}>
            <T variant="h4" gutterBottom display='flex' alignItems='center' justifyContent='center' >
              Избранные вакансии
            </T>
            <FavoritesList />
          </Box>
        </Container>
      </Box>
    );
  };
