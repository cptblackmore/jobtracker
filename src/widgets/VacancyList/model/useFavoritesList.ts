import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { errorMessages } from '@shared/lib/errorMessages';
import { AlertsStore, createAlert } from '@shared/model';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useFavoritesList = (ids: Array<string>, alertsStore: AlertsStore): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let isCancelled = false;
    
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
            console.log(e);
            const code = e.code ?? '';
            if (e.status === 404) {
              alertsStore.addAlert(createAlert('Некоторые вакансии были удалены из источников. Список избранного обновлён', 'warning'));
            } else if (errorMessages[code]) {
              alertsStore.addAlert(createAlert(errorMessages[code], 'error'));
            } else {
              alertsStore.addAlert(createAlert(`${errorMessages['UNKNOWN_ERROR']} ${e.message}`, 'error'));
            }
          }
        }
      });
      if (!isCancelled) await Promise.allSettled(promises);
      if (!isCancelled) setIsLoading(false);
    };

    fetchVacancies();

    return () => {
      isCancelled = true;
    };
  }, [ids]);

  return { vacancies, isLoading };
}
