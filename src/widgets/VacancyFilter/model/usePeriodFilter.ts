import { VacancyPeriod } from '@entities/Vacancy';
import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';

export const usePeriodFilter = () => {
  const [period, setPeriod] = useState<VacancyPeriod>(0);

  const handlePeriodChange = useCallback((e: SelectChangeEvent<VacancyPeriod>) => {
    setPeriod(Number(e.target.value) as VacancyPeriod);
  }, []);

  function resetPeriod() {  
    setPeriod(0);
  }

  return { period, resetPeriod, setPeriod, handlePeriodChange };
};
