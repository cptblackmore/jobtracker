import { useFavoritesList } from '../model/useFavoritesList';
import { useTriggerByScroll, VirtualizedVacancyList } from '@widgets/VacancyList';
import { FavoritesActions } from '@widgets/FavoritesActions';
import { EmptyFavoritesListMessage } from './EmptyFavoritesListMessage';
import { AlertsContext, createAlert, VisuallyHiddenTypography } from '@shared/ui';
import { useEffectOnceByCondition } from '@shared/lib';
import { useContext } from 'react';

export const FavoritesList: React.FC = () => {
  const { alertsStore } = useContext(AlertsContext);
  const { 
    vacancies,
    isLoading, 
    toNextPage,
    clearDisplayedFavorites,
    resetDisplayedFavorites,
    displayedIdsLength
  } = useFavoritesList();
    const scrolledEnough = useTriggerByScroll(2000);

    useEffectOnceByCondition(() => {
      alertsStore.addAlert(createAlert(
        'Для прокрутки наверх вы можете использовать сочетание клавиш "Alt+T", а для фокуса на панель навигации - "Alt+N"', 
        'info', 
        10000,
        'shortcuts-hint',
        'shortcuts-hint'
      ));
    }, [scrolledEnough], scrolledEnough);

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
