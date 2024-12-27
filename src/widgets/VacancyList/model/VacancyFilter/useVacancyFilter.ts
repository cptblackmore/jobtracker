import { VacancyParams } from "@entities/Vacancy";
import { useReducer, useState } from "react";
import { vacancyFilterReducer } from "./vacancyFilterReducer";

export const useVacancyFilter = (filters: VacancyParams['filters']) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [state, dispatch] = useReducer(vacancyFilterReducer, filters);

  return {
    showAdditional,
    setShowAdditional,
    state,
    dispatch
  };
}
