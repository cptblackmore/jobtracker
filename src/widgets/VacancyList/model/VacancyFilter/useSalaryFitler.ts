import { SwitchableVacancySalary } from '@entities/Vacancy/api/types/VacancyParams';
import { SALARY_MAX, SALARY_MIN } from '@widgets/VacancyList';
import { useCallback, useState } from 'react';

export interface SalaryFilterAction {
  action: 'toggle' | 'slider' | 'input';
  payload?: number[] | { field: 'from' | 'to'; value: number };
}

export const useSalaryFilter = (initialSalary?: SwitchableVacancySalary) => {
  const [salaryFilter, setSalaryFilter] = useState<SwitchableVacancySalary>({
    enabled: !!((initialSalary?.from ?? null) || (initialSalary?.to ?? null)),
    from: initialSalary?.from ?? SALARY_MIN,
    to: initialSalary?.to ?? SALARY_MAX,
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
            const value = payload.value;
            
            if (payload.field === 'from') {
              const prevTo = prev?.to ?? SALARY_MAX;
              const newValue = prevTo < SALARY_MAX ? value : SALARY_MAX;
              const isValueGreater = value > prevTo;

              return { 
                enabled: true, 
                from: isValueGreater ? newValue : value,
                to: isValueGreater ? newValue : prevTo
              };
            } else {
              const prevFrom = prev?.from ?? SALARY_MIN;
              const newValue = prevFrom > SALARY_MIN ? value : SALARY_MIN;
              const isValueLess = value < prevFrom;

              return { 
                enabled: true, 
                from: isValueLess ? newValue : prevFrom, 
                to: isValueLess ? newValue : value
              };
            }
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
