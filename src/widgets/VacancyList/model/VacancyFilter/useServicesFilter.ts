import { servicesRegistry, Sources, VacancyParams } from '@entities/Vacancy';
import { typedEntries } from '@shared/lib';
import { useCallback, useMemo, useState } from 'react';

export interface Service {
  source: Sources;
  color: string;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
  checked: boolean;
  incompatible: boolean
}

export const useServicesFilter = (selectedFilters: Array<keyof VacancyParams['filters']>, resetFilters: () => void) => {
  const [disabledServices, setDisabledServices] = useState<Sources[]>([]);

  const services: Service[] = useMemo(() => {
    return typedEntries(servicesRegistry).map(([source, config]) => (
      {
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: !disabledServices.includes(source),
        incompatible: selectedFilters.some(filter =>
          config.incompatibleFilters?.includes(filter)
        )
      }
    ))
  }, [disabledServices, selectedFilters]);

  const handleServiceChange = useCallback((service: Service) => {
    if (service.incompatible) {
      resetFilters();
      setDisabledServices([]);
    } else {
      setDisabledServices(prev => {
        if (!prev.includes(service.source)) {
          return [...prev, service.source];
        } else {
          return prev.filter(s => s !== service.source);
        }
      })
    }
  }, [resetFilters]);

  function resetServices() {
    typedEntries(servicesRegistry).map(([source]) => source)
  }

  return { services, resetServices, setDisabledServices, handleServiceChange };
};
