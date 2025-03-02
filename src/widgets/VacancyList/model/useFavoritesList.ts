import { Vacancy } from '@entities/Vacancy';
import { FavoritesContext } from '@features/Favorites';
import { AlertsContext } from '@shared/model';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchFavorites } from './fetchFavorites';

export const useFavoritesList = (ids: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);

  const fetchFavoritesCallback = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    await fetchFavorites(ids, setVacancies, signal, alertsStore, favoritesStore);
    setIsLoading(false);
  }, [ids, alertsStore, favoritesStore]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchFavoritesCallback(signal);

    return () => {
      controller.abort();
    };
  }, [ids]);

  return { vacancies, isLoading };
}
