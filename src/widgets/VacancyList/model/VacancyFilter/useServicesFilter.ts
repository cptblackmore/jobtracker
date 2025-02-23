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

export const useServicesFilter = (selectedFilters: Array<keyof VacancyParams['filters']>, resetFilters: () => void, initialServices?: Sources[]) => {
  const [enabledServices, setEnabledServices] = useState(initialServices ?? []);

  const services: Service[] = useMemo(() => {
    return typedEntries(servicesRegistry).map(([source, config]) => (
      {
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: enabledServices.includes(source),
        incompatible: selectedFilters.some(filter =>
          config.incompatibleFilters?.includes(filter)
        )
      }
    ))
  }, [enabledServices, selectedFilters]);

  const handleServiceChange = useCallback((service: Service) => {
    if (service.incompatible) {
      resetFilters();
      setEnabledServices(prev => [...prev, service.source]);
    } else {
      setEnabledServices(prev => {
        if (prev.includes(service.source)) {
          return prev.filter(s => s !== service.source);
        } else {
          return [...prev, service.source];
        }
      })
    }
  }, [resetFilters]);

  function resetServices() {
    typedEntries(servicesRegistry).map(([source]) => source)
  }

  return { services, resetServices, handleServiceChange };
};
