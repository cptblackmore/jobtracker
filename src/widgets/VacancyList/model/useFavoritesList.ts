import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { FavoritesContext, getFavorites } from '@features/Favorites';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import { errorMessages } from '@shared/lib/errorMessages';
import { AlertsContext, createAlert } from '@shared/model';
import axios, { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';

export const useFavoritesList = (ids: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const errorCodes = new Set<string>();
    
    const fetchVacancies = async () => {
      setIsLoading(true);
      setVacancies([]);

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

      if (errorCodes.size > 0) {
        for (const errorCode of errorCodes) {
          if (errorCode === 'FAVORITES_NOT_FOUND') {
            favoritesStore.updateFavorites(getFavorites());
            alertsStore.addAlert(createAlert(errorMessages['FAVORITES_NOT_FOUND'], 'warning'));
          } else if (errorCode === 'UNKNOWN_ERROR') {
            alertsStore.addAlert(createAlert(`${errorMessages['UNKNOWN_ERROR']} ${errorCode}`, 'error'));
          } else {
            alertsStore.addAlert(createAlert(errorMessages[errorCode], 'error'));
          }
        }
      }

      setIsLoading(false);
    };

    fetchVacancies();

    return () => {
      controller.abort();
    };
  }, [ids]);

  return { vacancies, isLoading };
}
