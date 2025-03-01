import { getVacancies, servicesRegistry, Sources, Vacancy, VacancyParams, VacancyPeriod } from '@entities/Vacancy';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActionVacancies, vacancyListReducer } from './vacancyListReducer';
import { AlertsContext, createAlert } from '@shared/model';
import { errorMessages } from '@shared/lib/errorMessages';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { VacancyType } from '@entities/Vacancy/api/types/VacancyParams';
import { filterValidValues, typedEntries, typedKeys, urlParametrizeEntries, validateValue } from '@shared/lib';
import { SALARY_MAX, SALARY_MIN } from '../config/salaryConfig';
import { calculateSelectedFilters } from './VacancyFilter/calculateSelectedFilters';

export const useVacancyList = (initialParams: VacancyParams) => {
  const location = useLocation();
  const navigate = useNavigate();

  function parseUrlFilters(): VacancyParams['filters'] | undefined {
    const params = new URLSearchParams(location.search);
    if (params.size === 0) return undefined;

    const text = params.get('text') ?? undefined;
    const period = validateValue(params.get('period'), [0, 1, 3, 7] as VacancyPeriod[], (v) => Number(v) as VacancyPeriod);
    const type = validateValue(params.get('type'), ['full', 'shift', 'fifo'] as VacancyType[]);
    const salaryFrom = validateValue(params.get('from'), [], Number, {range: {min: SALARY_MIN, max: SALARY_MAX}}) ?? SALARY_MIN;
    const salaryTo = validateValue(params.get('to'), [], Number, {range: {min: SALARY_MIN, max: SALARY_MAX}}) ?? SALARY_MAX;

    const excludedSources = new Set<Sources>(
      filterValidValues<Sources>(params.get('excludedSources')?.split(',') ?? [], typedKeys(servicesRegistry))
    );
    const selectedFilters = calculateSelectedFilters(
      period ?? 0, 
      type ?? 'none', 
      !!((salaryFrom ?? null) || (salaryTo ?? null))
    );
    for (const [source, config] of typedEntries(servicesRegistry)) {
      if (selectedFilters.some(filter => config.incompatibleFilters?.includes(filter))) {
        excludedSources.add(source);
      }
    }

    const parsedFilters: VacancyParams['filters'] = {
      text,
      period,
      type,
      salary: {
        from: salaryFrom,
        to: salaryTo < salaryFrom ? salaryFrom : salaryTo
      },
      excludedSources: Array.from(excludedSources)
    }
    
    return parsedFilters;
  }

  const parsedFilters = parseUrlFilters();

  const [state, dispatch] = useReducer(vacancyListReducer, {params: { ...initialParams, filters: parsedFilters || initialParams['filters'] }, vacancies: []});
  const vacancyIds = useRef<Set<string>>(new Set);
  const [isLoading, setIsLoading] = useState(true);
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
      const updatedParams = urlParametrizeEntries(state.params.filters);
      if (updatedParams) {
        navigate(`${location.pathname}?${updatedParams}`, { replace: true });
      } else {
        navigate(location.pathname, { replace: true });}
    }

    return () => {
      isCancelled = true;
    };
  }, [state.params.filters, state.params.page]);

  useEffect(() => {
    const parsedFilters = parseUrlFilters();
    dispatch({type: 'SET_FILTERS', filters: parsedFilters || initialParams['filters']});
  }, [location.search])

  return {
    state,
    isLoading,
    setPage: (page: number) => dispatch({type: 'SET_PAGE', page}),
    setFilters: (filters: VacancyParams['filters']) => dispatch({type: 'SET_FILTERS', filters})
  };
}
