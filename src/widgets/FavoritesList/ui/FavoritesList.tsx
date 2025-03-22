import { Box, Typography as T } from '@mui/material';
import { useFavoritesList } from '../model/useFavoritesList';
import { VirtualizedVacancyList } from '@widgets/VacancyList';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { FavoritesActions } from '@widgets/FavoritesActions';
import { observer } from 'mobx-react-lite';
import { EmptyFavoritesListMessage } from './EmptyFavoritesListMessage';

export const FavoritesList: React.FC = observer(() => {
  const { favoritesStore } = useContext(FavoritesContext);
  const { 
    vacancies,
    isLoading, 
    toNextPage,
    clearDisplayedFavorites,
    resetDisplayedFavorites,
    displayedIdsLength
  } = useFavoritesList();

  return (
    <Box>
      {favoritesStore.ids.length > 0 && (
        <T variant='body1' color='text.secondary' display='flex' ml={2} justifyContent='center' >
          Кол-во вакансий: {favoritesStore.ids.length}
        </T>
      )}
      <FavoritesActions 
        clearDisplayedFavorites={clearDisplayedFavorites} 
        resetDisplayedFavorites={resetDisplayedFavorites} 
      />
      {displayedIdsLength > 0 ? (
        <VirtualizedVacancyList 
          vacancies={vacancies}
          isLoading={isLoading}
          toNextPage={toNextPage}
        />
      ) : (
        <EmptyFavoritesListMessage />
      )}
    </Box>
  );
});
