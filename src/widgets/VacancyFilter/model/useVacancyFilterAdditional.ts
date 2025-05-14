import { parseFormattedPlace, VacancyParams } from "@entities/Vacancy";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePeriodFilter } from "./usePeriodFilter";
import { useTypeFilter } from "./useTypeFilter";
import { useSalaryFilter } from "./useSalaryFitler";
import { useSourcesFilter } from "./useSourcesFilter";
import { calculateSelectedFilters } from "./calculateSelectedFilters";
import { useResetModal } from "./useResetModal";
import { usePlaceFilter } from "./usePlaceFilter";

export const useVacancyFilterAdditional = (
  filters: VacancyParams["filters"],
  setShowAdditional: Dispatch<SetStateAction<boolean>>,
) => {
  const { period, resetPeriod, setPeriod, handlePeriodChange } =
    usePeriodFilter();
  const { type, resetType, setType, handleTypeChange } = useTypeFilter();
  const {
    place,
    resetPlace,
    setPlace,
    handlePlaceInputChange,
    handlePlaceChange,
    suggestedPlaces,
    formattedPlace,
    setFormattedPlace,
  } = usePlaceFilter();
  const {
    salaryFilter,
    resetSalaryFilter,
    setSalaryFilter,
    handleSalaryChange,
  } = useSalaryFilter();
  const [highlightedFilters, setHighlightedFilters] = useState<
    Array<keyof VacancyParams["filters"]>
  >([]);

  const resetFilters = useCallback(
    (filters?: Array<keyof VacancyParams["filters"]>) => {
      if (!filters) {
        resetPeriod();
        resetType();
        resetPlace();
        resetSalaryFilter();
      } else {
        const filtersToHighlight: Array<keyof VacancyParams["filters"]> = [];
        if (filters.includes("period")) {
          resetPeriod();
          filtersToHighlight.push("period");
        }
        if (filters.includes("type")) {
          resetType();
          filtersToHighlight.push("type");
        }
        if (filters.includes("salary")) {
          resetSalaryFilter();
          filtersToHighlight.push("salary");
        }
        if (filters.includes("place")) {
          resetPlace();
          filtersToHighlight.push("place");
        }

        if (filtersToHighlight.length)
          setHighlightedFilters(filtersToHighlight);
        setTimeout(() => setHighlightedFilters([]), 2000);
      }
    },
    [resetPeriod, resetType, resetPlace, resetSalaryFilter],
  );

  const {
    isModalOpen,
    setModalOpen,
    modalText,
    informerRef,
    incompatibleFiltersRef,
    onConfirm,
    openModal,
  } = useResetModal();

  const selectedFilters = useMemo(
    () => calculateSelectedFilters(period, type, place, salaryFilter.enabled),
    [period, type, place, salaryFilter.enabled],
  );

  const {
    sources,
    resetSources,
    setDisabledSources,
    handleSourceChange,
    highlightedSources,
  } = useSourcesFilter(selectedFilters, resetFilters, openModal);

  const resetFiltersAndSources = useCallback(() => {
    resetFilters();
    resetSources();
  }, [resetFilters, resetSources]);

  useEffect(() => {
    const from = filters?.salary?.from ?? 0;
    const to = filters?.salary?.to ?? 500000;

    setPeriod(filters?.period ?? 0);
    setType(filters?.type ?? "none");
    setPlace(
      (filters?.place && parseFormattedPlace(filters?.place).name) ?? "",
    );
    setFormattedPlace(
      (filters?.place && parseFormattedPlace(filters?.place).name) ?? "",
    );
    setSalaryFilter({
      enabled: !!(
        (filters?.salary?.from ?? null) ||
        (filters?.salary?.to ?? null)
      ),
      from,
      to: to < from ? from : to,
    });
    setDisabledSources(filters?.excludedSources ?? []);
  }, [filters]);

  return {
    period,
    handlePeriodChange,
    type,
    handleTypeChange,
    place,
    handlePlaceInputChange,
    handlePlaceChange,
    suggestedPlaces,
    formattedPlace,
    salaryFilter,
    handleSalaryChange,
    sources,
    handleSourceChange,
    resetFiltersAndSources,
    handleInvalid: () => setShowAdditional(true),
    highlightedFilters,
    highlightedSources,
    isModalOpen,
    setModalOpen,
    modalText,
    informerRef,
    incompatibleFiltersRef,
    onConfirm,
    openModal,
  };
};
