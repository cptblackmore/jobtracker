import { Vacancy } from "@entities/Vacancy";
import { getVacancyById } from "@entities/Vacancy/api/getVacancyById";
import { useEffect, useState } from "react";

export const useFavoritesList = (ids: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
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
          console.error(`Failed to fetch vacancy with id ${id}`, e);
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
