import { VacancyParams } from "@entities/Vacancy";
import { isEqual, urlParametrizeObject } from "@shared/lib";
import { parseUrlSearch } from "./parseUrlSearch";
import { NavigateFunction } from "react-router";

export const updateUrlFilters = (
  newFilters: VacancyParams["filters"],
  navigate: NavigateFunction,
): void => {
  const newUrlSearch = urlParametrizeObject({
    ...newFilters,
    period: newFilters.period === 0 ? null : newFilters.period,
  });
  const newSearchString = newUrlSearch ? `?${newUrlSearch}` : "";
  const currentUrl = new URL(window.location.href);

  if (
    !isEqual(parseUrlSearch(currentUrl.search), parseUrlSearch(newSearchString))
  ) {
    navigate(`${location.pathname}${newSearchString}`);
  }
};
