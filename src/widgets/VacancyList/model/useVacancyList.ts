import { VacancyParams } from '@entities/Vacancy';
import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActionVacancies, vacancyListReducer } from './vacancyListReducer';
import { AlertsContext } from '@shared/ui';
import { useLocation } from 'react-router';
import { isEqual } from '@shared/lib';
import { parseUrlSearch } from '@widgets/VacancyFilter';
import { fetchVacancies } from './fetchVacancies';
import axios from 'axios';

export const useVacancyList = (initialParams: VacancyParams) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(vacancyListReducer, {params: { ...initialParams, filters: parseUrlSearch() || initialParams['filters'] }, vacancies: []});
  const vacancyUniqueIds = useRef<Set<string>>(new Set);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPage, setPreviousPage] = useState(initialParams.page);
  const { alertsStore } = useContext(AlertsContext); 

  const fetchAndUpdateVacancies = async (actionType: ActionVacancies, signal: AbortSignal) => {
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
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (previousPage !== state.params.page) {
      setPreviousPage(state.params.page);
      fetchAndUpdateVacancies('ADD_VACANCIES', signal);
    } else {
      vacancyUniqueIds.current.clear();
      setPreviousPage(0);
      dispatch({type: 'SET_PAGE', page: 0})
      fetchAndUpdateVacancies('SET_VACANCIES', signal);
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
    alertsStore,
    toNextPage: useCallback(() => dispatch({type: 'SET_PAGE', page: state.params.page + 1}), [dispatch, state.params.page]),
    setFilters: useCallback((filters: VacancyParams['filters']) => dispatch({type: 'SET_FILTERS', filters}), [dispatch]),
  };
}
