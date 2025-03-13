import { Vacancy } from '@entities/Vacancy';
import { FavoritesContext } from '@features/Favorites';
import { AlertsContext } from '@shared/model';
import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchFavorites } from './fetchFavorites';
import axios from 'axios';
import { chunkerize } from '@shared/lib';

export const  useFavoritesList = (ids: string[]) => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(page);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);

  const fetchFavoritesCallback = useCallback(async (actionType: 'SET_FAVORITES' | 'ADD_FAVORITES', signal: AbortSignal) => {
    setIsLoading(true);
    try {
      const idChunk = chunkerize([...ids].reverse(), 5)[page];
      const result = await fetchFavorites(idChunk, signal, alertsStore, favoritesStore);
      const sortedResult = result.sort((a, b) => {
        return idChunk.indexOf(a.id) - idChunk.indexOf(b.id);
      })
      if (actionType === 'ADD_FAVORITES') {
        setVacancies(prev => [...prev, ...sortedResult]);
      } else {
        setVacancies(sortedResult);
      }
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
    }
  }, [ids, page, alertsStore, favoritesStore]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (previousPage !== page) {
      setPreviousPage(page);
      fetchFavoritesCallback('ADD_FAVORITES', signal);
    } else {
      if (page !== 0) {
        setPreviousPage(0);
        setPage(0);
      }
      fetchFavoritesCallback('SET_FAVORITES', signal);
    }

    return () => {
      controller.abort();
    };
  }, [ids, page]);

  return { vacancies, isLoading, page, setPage };
}
