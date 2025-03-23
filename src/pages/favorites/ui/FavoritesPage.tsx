  import { Box, Container, Typography as T } from '@mui/material';
  import { Nav } from '@widgets/Nav';
  import { FavoritesList } from '@widgets/FavoritesList';

  export const FavoritesPage: React.FC = () => {
    return (
      <Box>
        <Nav />
        <Container maxWidth='lg' >
          <Box my={4} >
            <T 
              variant='h4' 
              gutterBottom
              ml={2}
              display='flex' 
              alignItems='center' 
              justifyContent='flex-start'
            >
              Избранные вакансии
            </T>
            <FavoritesList />
          </Box>
        </Container>
      </Box>
    );
  };
