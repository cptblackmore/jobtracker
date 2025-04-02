import { VacancyParams } from '@entities/Vacancy';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { usePeriodFilter } from './usePeriodFilter';
import { useTypeFilter } from './useTypeFilter';
import { useSalaryFilter } from './useSalaryFitler';
import { useSourcesFilter } from './useSourcesFilter';
import { calculateSelectedFilters } from './calculateSelectedFilters';

export const useVacancyFilterAdditional = (filters: VacancyParams['filters'], setShowAdditional: Dispatch<SetStateAction<boolean>>) => {
  const { period, resetPeriod, setPeriod, handlePeriodChange } = usePeriodFilter();
  const { type, resetType, setType, handleTypeChange } = useTypeFilter();
  const { salaryFilter, resetSalaryFilter, setSalaryFilter, handleSalaryChange } = useSalaryFilter();
  const [highlightedFilters, setHighlightedFilters] = useState<Array<keyof VacancyParams['filters']>>([]);

  const resetFilters = useCallback((filters?: Array<keyof VacancyParams['filters']>) => {
    if (!filters) {
      resetPeriod();
      resetType();
      resetSalaryFilter();
    } else {
      const filtersToHighlight: Array<keyof VacancyParams['filters']> = [];
      if (filters.includes('period')) {
        resetPeriod();
        filtersToHighlight.push('period');
      }
      if (filters.includes('type')) {
        resetType();
        filtersToHighlight.push('type');
      }
      if (filters.includes('salary')) {
        resetSalaryFilter();
        filtersToHighlight.push('salary');
      }

      if (filtersToHighlight.length) setHighlightedFilters(filtersToHighlight);
      setTimeout(() => setHighlightedFilters([]), 2000);
    }
  }, [resetPeriod, resetType, resetSalaryFilter]);
  
  const selectedFilters = useMemo(() => calculateSelectedFilters(period, type, salaryFilter.enabled), [period, type, salaryFilter.enabled]);
  const { 
    sources, 
    resetSources, 
    setDisabledSources, 
    handleSourceChange,
    highlightedSources
  } = useSourcesFilter(selectedFilters, resetFilters);

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
    resetFiltersAndSources,
    handleInvalid: () => setShowAdditional(true),
    highlightedFilters,
    highlightedSources
  };
};
