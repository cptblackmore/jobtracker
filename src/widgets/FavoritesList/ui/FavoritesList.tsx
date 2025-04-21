import { useFavoritesList } from '../model/useFavoritesList';
import { VirtualizedVacancyList } from '@widgets/VacancyList';
import { FavoritesActions } from '@widgets/FavoritesActions';
import { EmptyFavoritesListMessage } from './EmptyFavoritesListMessage';
import { VisuallyHiddenTypography } from '@shared/ui';

export const FavoritesList: React.FC = () => {
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
        <>
          <VisuallyHiddenTypography>Список избранных вакансий</VisuallyHiddenTypography>
          <VirtualizedVacancyList 
            vacancies={vacancies}
            isLoading={isLoading}
            toNextPage={toNextPage}
          />
        </>
      ) : (
        <EmptyFavoritesListMessage />
      )}
    </>
  );
};
