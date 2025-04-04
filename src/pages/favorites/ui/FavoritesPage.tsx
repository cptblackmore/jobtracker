import { Box, Container } from '@mui/material';
import { FavoritesList } from '@widgets/FavoritesList';
import { PageTitle } from '@widgets/PageTitle';

  export const FavoritesPage: React.FC = () => {
    return (
      <>
        <Container maxWidth='lg' >
          <Box py={{xs: 2, sm: 4}} >
            <PageTitle title='Избранные вакансии' />
            <FavoritesList />
          </Box>
        </Container>
      </>
    );
  };
