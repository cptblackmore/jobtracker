import { SwitchableVacancySalary } from '@entities/Vacancy/api/types/VacancyParams';
import { useCallback, useState } from 'react';

export interface SalaryFilterAction {
  action: 'toggle' | 'slider' | 'input';
  payload?: number[] | { field: 'from' | 'to'; value: number };
}

export const useSalaryFilter = (initialSalary?: SwitchableVacancySalary) => {
  const [salaryFilter, setSalaryFilter] = useState<SwitchableVacancySalary>({
    enabled: !!((initialSalary?.from ?? null) || (initialSalary?.to ?? null)),
    from: initialSalary?.from ?? 0,
    to: initialSalary?.to ?? 500_000,
  });

  const handleSalaryChange = useCallback(({ action, payload }: SalaryFilterAction) => {
    setSalaryFilter(prev => {
      switch (action) {
        case 'toggle':
          return { ...prev, enabled: !prev.enabled };
        case 'slider':
          if (Array.isArray(payload)) {
            return { enabled: true, from: payload[0], to: payload[1] };
          }
          return prev;
        case 'input':
          if (payload && !Array.isArray(payload)) {
            return { ...prev, enabled: true, [payload.field]: Number(payload.value) };
          }
          return prev;
        default:
          return prev;
      }
    });
  }, []);

  function resetSalaryFilter() {
    setSalaryFilter(prev => ({...prev, enabled: false}));
  }

  return { salaryFilter, resetSalaryFilter, handleSalaryChange };
};
