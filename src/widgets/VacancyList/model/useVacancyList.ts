import { getVacancies, Vacancy, VacancyParams } from '@entities/Vacancy';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActionVacancies, vacancyListReducer } from './vacancyListReducer';
import { AlertsContext, createAlert } from '@shared/model';
import { errorMessages } from '@shared/lib/errorMessages';
import { AxiosError } from 'axios';

export const useVacancyList = (initialParams: VacancyParams) => {
  const [state, dispatch] = useReducer(vacancyListReducer, {params: initialParams, vacancies: []});
  const vacancyIds = useRef<Set<string>>(new Set);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState(initialParams.page);
  const { alertsStore } = useContext(AlertsContext); 
  
  useEffect(() => {
    let isCancelled = false;
    const errors = new Set<string>();

    const fetchVacancies = async (type: ActionVacancies) => {
      setIsLoading(true);
      try {
        if (isCancelled) return;
        const newVacancies: Array<Vacancy> = await getVacancies(state.params);
        if (isCancelled) return;
        const uniqueVacancies: Array<Vacancy> = newVacancies.filter((vacancy) => {
          if (!vacancyIds.current.has(vacancy.id)) {
            vacancyIds.current.add(vacancy.id);
            return true;
          }
          return false;
        });
        if (isCancelled) return;
        dispatch({type, vacancies: uniqueVacancies});
      } catch (e) {
        if (e instanceof AxiosError) {
          const code = e.code ?? null;
          if (code) errors.add(code);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          if (errors.size > 0) {
            for (const error of errors) {
              if (errorMessages[error]) {
                alertsStore.addAlert(createAlert(errorMessages[error], 'error'));
              } else {
                alertsStore.addAlert(createAlert(`${errorMessages['UNKNOWN_ERROR']} ${error}`, 'error'));
              }
            }
          }
        }
      }
    }

    if (previousPage !== state.params.page) {
      setPreviousPage(state.params.page);
      fetchVacancies('ADD_VACANCIES');
    } else {
      vacancyIds.current.clear();
      fetchVacancies('SET_VACANCIES');
    }

    return () => {
      isCancelled = true;
    };
  }, [state.params.filters, state.params.page])

  return {
    state,
    isLoading,
    setPage: (page: number) => dispatch({type: 'SET_PAGE', page}),
    setFilters: (filters: VacancyParams['filters']) => dispatch({type: 'SET_FILTERS', filters})
  };
}
