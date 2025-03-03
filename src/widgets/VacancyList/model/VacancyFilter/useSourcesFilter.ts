import { sourcesRegistry, Sources, VacancyParams } from '@entities/Vacancy';
import { typedEntries } from '@shared/lib';
import { useCallback, useMemo, useState } from 'react';

export interface SourceFilter {
  source: Sources;
  color: string;
  incompatibleFilters?: Array<keyof VacancyParams['filters']>;
  checked: boolean;
  incompatible: boolean
}

export const useSourcesFilter = (selectedFilters: Array<keyof VacancyParams['filters']>, resetFilters: () => void) => {
  const [disabledSources, setDisabledSources] = useState<Sources[]>([]);

  const sources: SourceFilter[] = useMemo(() => {
    return typedEntries(sourcesRegistry).map(([source, config]) => (
      {
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: !disabledSources.includes(source),
        incompatible: selectedFilters.some(filter =>
          config.incompatibleFilters?.includes(filter)
        )
      }
    ))
  }, [disabledSources, selectedFilters]);

  const handleSourceChange = useCallback((source: SourceFilter) => {
    if (source.incompatible) {
      resetFilters();
      setDisabledSources([]);
    } else {
      setDisabledSources(prev => {
        if (!prev.includes(source.source)) {
          return [...prev, source.source];
        } else {
          return prev.filter(s => s !== source.source);
        }
      })
    }
  }, [resetFilters]);

  function resetSources() {
    typedEntries(sourcesRegistry).map(([source]) => source)
  }

  return { sources, resetSources, setDisabledSources, handleSourceChange };
};
