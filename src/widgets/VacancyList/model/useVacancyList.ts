import { getVacancies, Vacancy, VacancyParams } from "@entities/Vacancy";
import { useFetching } from "@shared/api";
import { useEffect, useReducer, useRef } from "react";
import { ActionVacancies, vacancyListReducer } from "./vacancyListReducer";

export const useVacancyList = (initialParams: VacancyParams) => {
  const [state, dispatch] = useReducer(vacancyListReducer, {params: initialParams, vacancies: []});
  const vacancyIds = useRef<Set<string>>(new Set);
  const isFirstRender = useRef(true);
  const isDoubleRender = useRef(true); // TODO Remove it before release
  
  const [fetchVacancies, isVacanciesLoading] = useFetching(async (type: ActionVacancies) => {
    const newVacancies: Array<Vacancy> = await getVacancies(state.params);
    const uniqueVacancies: Array<Vacancy> = newVacancies.filter((vacancy) => {
      if (!vacancyIds.current.has(vacancy.id)) {
        vacancyIds.current.add(vacancy.id);
        return true;
      }
      return false;
    });
    dispatch({type, vacancies: uniqueVacancies});
  });
  
  useEffect(() => {
    if (isFirstRender.current || isDoubleRender.current) return;
    fetchVacancies('ADD_VACANCIES');
  }, [state.params.page])
  useEffect(() => {
    vacancyIds.current.clear();
    if (isFirstRender.current || isDoubleRender.current) return;
    fetchVacancies('SET_VACANCIES');
  }, [state.params.filters])
  useEffect(() => {
    if (!isFirstRender.current) {
      isDoubleRender.current = false;
    } else {
      isFirstRender.current = false;
      fetchVacancies('SET_VACANCIES');
    }
  }, [])

  return {
    params: state.params,
    vacancies: state.vacancies, 
    isVacanciesLoading,
    setPage: (page: number) => dispatch({type: 'SET_PAGE', page}),
    setFilters: (filters: VacancyParams['filters']) => dispatch({type: 'SET_FILTERS', filters})
  }
}
