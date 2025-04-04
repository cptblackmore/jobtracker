import { useFavoritesList } from '../model/useFavoritesList';
import { VirtualizedVacancyList } from '@widgets/VacancyList';
import { FavoritesActions } from '@widgets/FavoritesActions';
import { observer } from 'mobx-react-lite';
import { EmptyFavoritesListMessage } from './EmptyFavoritesListMessage';

export const FavoritesList: React.FC = observer(() => {
  const { 
    vacancies,
    isLoading, 
    toNextPage,
    clearDisplayedFavorites,
    resetDisplayedFavorites,
    displayedIdsLength
  } = useFavoritesList();

  return (
    <>
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
    </>
  );
});
