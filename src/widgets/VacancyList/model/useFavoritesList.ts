import { Vacancy } from '@entities/Vacancy';
import { FavoritesContext } from '@features/Favorites';
import { AlertsContext } from '@shared/model';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchFavorites } from './fetchFavorites';
import axios from 'axios';

export const  useFavoritesList = (idChunk: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);

  const fetchFavoritesCallback = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    try {
      const result = await fetchFavorites(idChunk, setVacancies, signal, alertsStore, favoritesStore);
      const sortedResult = result.sort((a, b) => {
        return idChunk.indexOf(a.id) - idChunk.indexOf(b.id);
      })
      setVacancies(prev => [...prev, ...sortedResult]);
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
    }
  }, [idChunk, alertsStore, favoritesStore]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchFavoritesCallback(signal);

    return () => {
      controller.abort();
    };
  }, [idChunk]);

  return { vacancies, isLoading };
}
