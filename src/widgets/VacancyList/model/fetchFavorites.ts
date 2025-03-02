import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import axios, { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { handleErrors } from './handleErrors';
import { AlertsStore } from '@shared/model';
import { FavoritesStore, getFavorites } from '@features/Favorites';

export const fetchFavorites = async (
  ids: string[], 
  setVacancies: Dispatch<SetStateAction<Vacancy[]>>, 
  signal: AbortSignal,
  alertsStore: AlertsStore,
  favoritesStore: FavoritesStore
) => {
  setVacancies([]);
  const errorCodes = new Set<string>();

  const promises = ids.map(async (id) => {
    try {
      const fetchedVacancy = await getVacancyById(id, signal);
      setVacancies((prev) => [...prev, fetchedVacancy]);
    } catch (e) {
      if (axios.isCancel(e)) return;
      if (e instanceof AxiosError) {
        const code = e.code ?? 'UNKNOWN_ERROR';
        if (code === 'FAVORITES_NOT_FOUND' || e.status === 404) {
          deleteFromFavorites(id);
          errorCodes.add('FAVORITES_NOT_FOUND')
        } else {
          if (code) errorCodes.add(code);
        }
      }
    }
  });
  await Promise.allSettled(promises);

  if (errorCodes.size > 0) handleErrors(errorCodes, alertsStore, () => favoritesStore.updateFavorites(getFavorites()));
};
