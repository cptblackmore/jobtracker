import { FavoritesContext } from '@features/Favorites';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { FavoritesList } from '@widgets/FavoritesList';
import { FavoritesQuantity } from '@widgets/FavoritesQuantity';
import { PageTitle } from '@widgets/PageTitle';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

export const FavoritesPage: React.FC = observer(() => {
  const { favoritesStore } = useContext(FavoritesContext);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Container maxWidth='lg' >
        <Box py={{xs: 2, sm: 4}} >
          <PageTitle 
            title={`Избранные вакансии${!isSmUp || favoritesStore.ids.length === 0 ? '' : `  – ${favoritesStore.ids.length}`}`} 
          />
          {!isSmUp && <FavoritesQuantity />}
          <FavoritesList />
        </Box>
      </Container>
    </>
  );
});

