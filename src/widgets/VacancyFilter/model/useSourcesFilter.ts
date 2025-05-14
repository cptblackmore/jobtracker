import { sourcesRegistry, Sources, VacancyParams } from "@entities/Vacancy";
import { isEqual, typedEntries } from "@shared/lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface SourceFilter {
  source: Sources;
  color: string;
  incompatibleFilters?: Array<keyof VacancyParams["filters"]>;
  checked: boolean;
  incompatible: boolean;
}

export const useSourcesFilter = (
  selectedFilters: Array<keyof VacancyParams["filters"]>,
  resetFilters: (filters: Array<keyof VacancyParams["filters"]>) => void,
  openModal: (
    text: string,
    onReset: () => void,
    incompatibleFilters?: Array<keyof VacancyParams["filters"]>,
  ) => void,
) => {
  const [disabledSources, setDisabledSources] = useState<Sources[]>([]);
  const [highlightedSources, setHighlightedSources] = useState<Sources[]>([]);
  const sourcesRef = useRef<SourceFilter[]>([]);

  const sources: SourceFilter[] = useMemo(() => {
    const newSources = typedEntries(sourcesRegistry).map(
      ([source, config]) => ({
        source,
        color: config.styles.color,
        incompatibleFilters: config.incompatibleFilters,
        checked: !disabledSources.includes(source),
        incompatible: selectedFilters.some((filter) =>
          config.incompatibleFilters?.includes(filter),
        ),
      }),
    );

    if (!isEqual(sourcesRef.current, newSources)) {
      sourcesRef.current = newSources;
    }

    return sourcesRef.current;
  }, [disabledSources, selectedFilters]);

  useEffect(() => {
    setHighlightedSources(
      sources
        .filter((source) => source.incompatible)
        .map((source) => source.source),
    );
  }, [sources]);

  const handleSourceChange = useCallback(
    (source: SourceFilter) => {
      if (source.incompatible) {
        openModal(
          "Вы сбросите следующие фильтры: ",
          () => {
            resetFilters(source.incompatibleFilters ?? []);
            setDisabledSources((prev) =>
              prev.filter((s) => s !== source.source),
            );
          },
          source.incompatibleFilters,
        );
      } else {
        setDisabledSources((prev) => {
          if (!prev.includes(source.source)) {
            return [...prev, source.source];
          } else {
            return prev.filter((s) => s !== source.source);
          }
        });
      }
    },
    [resetFilters],
  );

  function resetSources() {
    setDisabledSources([]);
  }

  return {
    sources,
    resetSources,
    setDisabledSources,
    handleSourceChange,
    highlightedSources,
  };
};
