import { VacancyPeriod } from "@entities/Vacancy";
import { SwitchableVacancySalary, SwitchableVacancyType, VacancyParams } from "@entities/Vacancy/api/types/VacancyParams";

export const calculateSelectedFilters = (period: VacancyPeriod, type: SwitchableVacancyType, isSalaryEnabled: SwitchableVacancySalary['enabled']) => {
  const selectedFilters: Array<keyof VacancyParams['filters']> = [];
  if (period !== 0) selectedFilters.push('period');
  if (type !== 'none') selectedFilters.push('type');
  if (isSalaryEnabled) selectedFilters.push('salary');

  return selectedFilters;
}
