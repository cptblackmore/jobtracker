import { Vacancy } from '@entities/Vacancy';
import { FavoritesContext } from '@features/Favorites';
import { AlertsContext } from '@shared/model';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { chunkerize } from '@shared/lib';
import { fetchFavorites } from './fetchFavorites';
import { FAVORITES_CHUNK_SIZE } from '@shared/config';

export const  useFavoritesList = () => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(page);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const [displayedIds, setDisplayedIds] = useState(favoritesStore.ids);

  const toNextPage = useCallback(() => {
    if (page < (Math.ceil(favoritesStore.ids.length / FAVORITES_CHUNK_SIZE) - 1)) {
      setPage(page + 1);
    }
  }, [page, favoritesStore.ids.length]);

  const clearDisplayedFavorites = () => {
    setVacancies([]);
    setDisplayedIds([]);
    setPage(0);
    setPreviousPage(0);
  }

  const resetDisplayedFavorites = () => {
    setVacancies([]);
    setDisplayedIds(favoritesStore.ids);
    setPage(0);
    setPreviousPage(0);
  }

  const fetchAndUpdateFavorites = async (actionType: 'SET_FAVORITES' | 'ADD_FAVORITES', signal: AbortSignal) => {
    setIsLoading(true);
    try {
      const idChunk = chunkerize([...displayedIds].reverse(), FAVORITES_CHUNK_SIZE)[page];
      const result = await fetchFavorites(idChunk, signal, alertsStore, favoritesStore);
      if (result.length === 0) {
        toNextPage();
        return;
      }
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
  }

  useEffect(() => {
    if (favoritesStore.ids.length > displayedIds.length) {
      setDisplayedIds(favoritesStore.ids);      
    }
  }, [favoritesStore.ids.length]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    if (previousPage !== page) {
      setPreviousPage(page);
      fetchAndUpdateFavorites('ADD_FAVORITES', signal);
    } else {
      if (page !== 0) {
        setPreviousPage(0);
        setPage(0);
      }
      fetchAndUpdateFavorites('SET_FAVORITES', signal);
    }

    return () => {
      controller.abort();
    };
  }, [displayedIds, page]);

  return { 
    vacancies,
    isLoading, 
    toNextPage,
    clearDisplayedFavorites,
    resetDisplayedFavorites,
    displayedIdsLength: displayedIds.length
  };
}
