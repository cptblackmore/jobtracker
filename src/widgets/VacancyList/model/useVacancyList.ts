import { VacancyParams } from '@entities/Vacancy';
import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActionVacancies, vacancyListReducer } from './vacancyListReducer';
import { AlertsContext } from '@shared/model';
import { useLocation } from 'react-router';
import { isEqual } from '@shared/lib';
import { parseUrlSearch } from './VacancyFilter/parseUrlSearch';
import { fetchVacancies } from './fetchVacancies';
import axios from 'axios';

export const useVacancyList = (initialParams: VacancyParams) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(vacancyListReducer, {params: { ...initialParams, filters: parseUrlSearch() || initialParams['filters'] }, vacancies: []});
  const vacancyUniqueIds = useRef<Set<string>>(new Set);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPage, setPreviousPage] = useState(initialParams.page);
  const { alertsStore } = useContext(AlertsContext); 

  const fetchVacanciesCallback = useCallback(async (actionType: ActionVacancies, signal: AbortSignal) => {
    setIsLoading(true);
    try {
      const result = await fetchVacancies(state.params, signal, alertsStore);
      const uniqueVacancies = result.filter(vacancy => {
        if (!vacancyUniqueIds.current.has(vacancy.id)) {
          vacancyUniqueIds.current.add(vacancy.id);
          return true;
        }
        return false;
      });
      dispatch({type: actionType, vacancies: uniqueVacancies || []});
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) return;
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [state.params, vacancyUniqueIds, alertsStore]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (previousPage !== state.params.page) {
      setPreviousPage(state.params.page);
      fetchVacanciesCallback('ADD_VACANCIES', signal);
    } else {
      vacancyUniqueIds.current.clear();
      setPreviousPage(0);
      dispatch({type: 'SET_PAGE', page: 0})
      fetchVacanciesCallback('SET_VACANCIES', signal);
    }

    return () => {
      controller.abort();
    };
  }, [state.params.filters, state.params.page]);

  useEffect(() => {
    const parsedFilters = parseUrlSearch();
    if (!isEqual({...parsedFilters}, {...state.params.filters})) {
      dispatch({type: 'SET_FILTERS', filters: parsedFilters || initialParams['filters']});
    }
  }, [location.search])

  return {
    state,
    isLoading,
    setPage: (page: number) => dispatch({type: 'SET_PAGE', page}),
    setFilters: (filters: VacancyParams['filters']) => dispatch({type: 'SET_FILTERS', filters})
  };
}
