import { Vacancy } from "@entities/Vacancy";
import { getVacancyById } from "@entities/Vacancy/api/getVacancyById";
import { useEffect, useRef, useState } from "react";

export const useFavoritesList = (ids: Array<string>): {vacancies: Vacancy[], isLoading: boolean} => {
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);
  const isDoubleRender = useRef(true); // TODO Remove it before release
  const fetchVacancies = async () => {
    setIsLoading(true);
    const promises = ids.map(async (id) => {
      try {
        const fetchedVacancy = await getVacancyById(id);
        setVacancies((prev) => [...prev, fetchedVacancy]);
      } catch (error) {
        console.error(`Failed to fetch vacancy with id ${id}`, error);
      }
    });
    await Promise.allSettled(promises);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      isDoubleRender.current = false;
    } else {
      isFirstRender.current = false;
      if (ids.length > 0) {
        fetchVacancies();
      }
    }
  }, [ids]);

  return {vacancies, isLoading};
}
