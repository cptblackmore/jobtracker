import { getVacancies, Vacancy, VacancyParams } from "@entities/Vacancy";
import { useFetching } from "@shared/api";
import { useEffect, useRef, useState } from "react";

export const useVacancyList = (initialParams: VacancyParams) => {
  const [params, setParams] = useState(initialParams);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const vacancyIds = useRef<Set<string>>(new Set);
  const prevParamsRef = useRef<VacancyParams>(initialParams);
  
  const [fetchVacancies, isVacanciesLoading] = useFetching(async (type: string) => {
    const newVacancies = await getVacancies(params);
    const uniqueVacancies = newVacancies.filter((vacancy) => {
      if (!vacancyIds.current.has(vacancy.id)) {
        vacancyIds.current.add(vacancy.id);
        return true;
      }
      return false;
    });

    switch (type) {
      case 'SET_PAGE':
        setVacancies(prev => [...prev, ...uniqueVacancies]);
        break;
      case 'SET_FILTERS':
        setVacancies(uniqueVacancies);
        break;
      default:
        break;
    }
  });
  
  useEffect(() => {
    fetchVacancies('SET_PAGE');
  }, [])
  useEffect(() => {
    const prevParams = prevParamsRef.current;
    const isFiltersChanged = JSON.stringify(prevParams.filters) !== JSON.stringify(params.filters);
    
    if (isFiltersChanged) {
      setVacancies([]);
      vacancyIds.current.clear();
      fetchVacancies('SET_FILTERS');
    } else if (prevParams.page !== params.page) {
      fetchVacancies('SET_PAGE');
    } else {
      console.log(prevParams, params);
    }
    
    prevParamsRef.current = params;
  }, [params])

  return {
    params,
    setPage: (page: number) => setParams({...params, page}),
    setFilters: (filters: VacancyParams['filters']) => setParams({...params, filters}),
    vacancies, 
    isVacanciesLoading
  }
}
