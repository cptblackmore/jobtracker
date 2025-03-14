import { VacancyParams } from '@entities/Vacancy';
import { useCallback, useEffect, useMemo } from 'react';
import { usePeriodFilter } from './usePeriodFilter';
import { useTypeFilter } from './useTypeFilter';
import { useSalaryFilter } from './useSalaryFitler';
import { useSourcesFilter } from './useSourcesFilter';
import { calculateSelectedFilters } from './calculateSelectedFilters';

export const useVacancyFilterAdditional = (filters: VacancyParams['filters']) => {
  const { period, resetPeriod, setPeriod, handlePeriodChange } = usePeriodFilter();
  const { type, resetType, setType, handleTypeChange } = useTypeFilter();
  const { salaryFilter, resetSalaryFilter, setSalaryFilter, handleSalaryChange } = useSalaryFilter();

  const resetFilters = useCallback(() => {
    resetPeriod();
    resetType();
    resetSalaryFilter();
  }, [resetPeriod, resetType, resetSalaryFilter]);
  
  const selectedFilters = useMemo(() => calculateSelectedFilters(period, type, salaryFilter.enabled), [period, type, salaryFilter.enabled]);
  const { sources, resetSources, setDisabledSources, handleSourceChange } = useSourcesFilter(selectedFilters, resetFilters);

  const resetFiltersAndSources = useCallback(() => {
    resetFilters();
    resetSources();
  }, [resetFilters, resetSources]);

  useEffect(() => {
    const from = filters?.salary?.from ?? 0;
    const to = filters?.salary?.to ?? 500000;
    
    setPeriod(filters?.period ?? 0);
    setType(filters?.type ?? 'none');
    setSalaryFilter({
      enabled: !!((filters?.salary?.from ?? null) || (filters?.salary?.to ?? null)),
      from,
      to: to < from ? from : to
    });
    setDisabledSources(filters?.excludedSources ?? []);
  }, [filters])

  return {
    period, 
    handlePeriodChange, 
    type, 
    handleTypeChange, 
    salaryFilter, 
    handleSalaryChange,
    sources, 
    handleSourceChange, 
    resetFiltersAndSources
  };
};
