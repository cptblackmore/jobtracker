import { VacancyPeriod } from '@entities/Vacancy';
import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';

export const usePeriodFilter = (initialPeriod?: VacancyPeriod) => {
  const [period, setPeriod] = useState(initialPeriod ?? 0);

  const handlePeriodChange = useCallback((e: SelectChangeEvent<VacancyPeriod>) => {
    setPeriod(Number(e.target.value) as VacancyPeriod);
  }, []);

  function resetPeriod() {  
    setPeriod(0);
  }

  return { period, resetPeriod, handlePeriodChange };
};
