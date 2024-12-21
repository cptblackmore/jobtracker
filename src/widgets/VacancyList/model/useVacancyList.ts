import { getVacancies, Vacancy, VacancyParams } from "@entities/Vacancy";
import { useFetching } from "@shared/api";
import { useEffect, useRef, useState } from "react";

export const useVacancyList = (params: VacancyParams) => {
  const [page, setPage] = useState<number>(params.page);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const vacancyIds = useRef<Set<string>>(new Set);
  
  const [fetchVacancies, isVacanciesLoading] = useFetching(async () => {
    const newVacancies = await getVacancies({ ...params, page });
    const uniqueVacancies = newVacancies.filter((vacancy) => {
      if (!vacancyIds.current.has(vacancy.id)) {
        vacancyIds.current.add(vacancy.id);
        return true;
      }
      return false;
    });
    setVacancies(prev => [...prev, ...uniqueVacancies]);
  });
  
  useEffect(() => {
    fetchVacancies();
  }, [page])

  return {page, setPage, vacancies, isVacanciesLoading}
}
