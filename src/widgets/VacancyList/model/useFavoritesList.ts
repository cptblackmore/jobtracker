import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { FavoritesContext, getFavorites } from '@features/Favorites';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import { errorMessages } from '@shared/lib/errorMessages';
import { AlertsContext, createAlert } from '@shared/model';
import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';

export const useFavoritesList = (ids: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alertsStore } = useContext(AlertsContext);
  const { favoritesStore } = useContext(FavoritesContext);

  useEffect(() => {
    let isCancelled = false;
    const errorCodes = new Set<string>();
    
    const fetchVacancies = async () => {
      setIsLoading(true);
      setVacancies([]);

      const promises = ids.map(async (id) => {
        if (isCancelled) return;
        try {
          const fetchedVacancy = await getVacancyById(id);
          if (!isCancelled) setVacancies((prev) => [...prev, fetchedVacancy]);
        } catch (e) {
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
      if (!isCancelled) await Promise.allSettled(promises);
      if (!isCancelled && errorCodes.size > 0) {
        for (const errorCode of errorCodes) {
          if (errorCode === 'FAVORITES_NOT_FOUND') {
            favoritesStore.updateFavorites(getFavorites());
            alertsStore.addAlert(createAlert(errorMessages['FAVORITES_NOT_FOUND'], 'warning'));
          } else if (errorMessages[errorCode]) {
            alertsStore.addAlert(createAlert(errorMessages[errorCode], 'error'));
          } else {
            alertsStore.addAlert(createAlert(`${errorMessages['UNKNOWN_ERROR']} ${errorCode}`, 'error'));
          }
        }
      }
      if (!isCancelled) setIsLoading(false);
    };

    fetchVacancies();

    return () => {
      isCancelled = true;
    };
  }, [ids]);

  return { vacancies, isLoading };
}
