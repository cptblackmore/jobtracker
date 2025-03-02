import { VacancyParams } from '@entities/Vacancy';
import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActionVacancies, vacancyListReducer } from './vacancyListReducer';
import { AlertsContext } from '@shared/model';
import { useLocation } from 'react-router';
import { isEqual } from '@shared/lib';
import { parseUrlSearch } from './VacancyFilter/parseUrlSearch';
import { fetchVacancies } from './fetchVacancies';

export const useVacancyList = (initialParams: VacancyParams) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(vacancyListReducer, {params: { ...initialParams, filters: parseUrlSearch() || initialParams['filters'] }, vacancies: []});
  const vacancyIds = useRef<Set<string>>(new Set);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPage, setPreviousPage] = useState(initialParams.page);
  const { alertsStore } = useContext(AlertsContext); 

  const fetchVacanciesCallback = useCallback(async (actionType: ActionVacancies, signal: AbortSignal) => {
    setIsLoading(true);
    await fetchVacancies(state.params, dispatch, vacancyIds, actionType, signal, alertsStore);
    setIsLoading(false);
  }, [state.params, vacancyIds, alertsStore]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (previousPage !== state.params.page) {
      setPreviousPage(state.params.page);
      fetchVacanciesCallback('ADD_VACANCIES', signal);
    } else {
      vacancyIds.current.clear();
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
