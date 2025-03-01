import { VacancyParams } from '@entities/Vacancy';
import { useCallback, useMemo } from 'react';
import { usePeriodFilter } from './usePeriodFilter';
import { useTypeFilter } from './useTypeFilter';
import { useSalaryFilter } from './useSalaryFitler';
import { useServicesFilter } from './useServicesFilter';
import { calculateSelectedFilters } from './calculateSelectedFilters';

export const useVacancyFilter = (initialFilters: VacancyParams['filters']) => {
  const { period, resetPeriod, handlePeriodChange } = usePeriodFilter(initialFilters?.period);
  const { type, resetType, handleTypeChange } = useTypeFilter(initialFilters?.type);
  const { salaryFilter, resetSalaryFilter, handleSalaryChange } = useSalaryFilter(initialFilters?.salary);

  const resetFilters = useCallback(() => {
    resetPeriod();
    resetType();
    resetSalaryFilter();
  }, [resetPeriod, resetType, resetSalaryFilter]);
  
  const selectedFilters = useMemo(() => calculateSelectedFilters(period, type, salaryFilter.enabled), [period, type, salaryFilter.enabled]);
  const { services, resetServices, handleServiceChange } = useServicesFilter(selectedFilters, resetFilters, initialFilters?.excludedSources);

  const resetFiltersAndServices = useCallback(() => {
    resetFilters();
    resetServices();
  }, [resetFilters, resetServices]);

  return {
    period, 
    handlePeriodChange, 
    type, 
    handleTypeChange, 
    salaryFilter, 
    handleSalaryChange,
    services, 
    handleServiceChange, 
    resetFiltersAndServices
  };
};
