import { getVacancies, Vacancy } from "@entities/Vacancy";
import { useFetching } from "@shared/api";
import { useEffect, useRef, useState } from "react";

export const useVacancyList = (startPage=0, count=10) => {
  const [page, setPage] = useState<number>(startPage);
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const vacancyIds = useRef<Set<string>>(new Set);
  const [fetchVacancies, isVacanciesLoading] = useFetching(async () => {
    const newVacancies = await getVacancies(page, count);
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
