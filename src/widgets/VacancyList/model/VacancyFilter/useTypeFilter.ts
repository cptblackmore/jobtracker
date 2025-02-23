import { VacancyType } from '@entities/Vacancy';
import { SwitchableVacancyType } from '@entities/Vacancy/api/types/VacancyParams';
import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';

export const useTypeFilter = (initialType?: VacancyType) => {
  const [type, setType] = useState<SwitchableVacancyType>(initialType ?? 'none');

  const handleTypeChange = useCallback((e: SelectChangeEvent<SwitchableVacancyType>) => {
    setType(e.target.value as SwitchableVacancyType);
  }, []);

  function resetType() {
    setType('none');
  }

  return { type, resetType, handleTypeChange };
};
