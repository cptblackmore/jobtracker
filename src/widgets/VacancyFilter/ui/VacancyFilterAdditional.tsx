import { VacancyParams } from "@entities/Vacancy";
import { Button, Divider, Grid2, useMediaQuery, useTheme } from "@mui/material";
import { SalaryFilter } from "./SalaryFilter";
import { SourceSelection } from "./SourceSelection";
import { BasicFilters } from "./BasicFilters";
import { SalaryCheckbox } from "./SalaryCheckbox";
import { useVacancyFilterAdditional } from "../model/useVacancyFilterAdditional";
import { Dispatch, SetStateAction } from "react";
import {
  AriaInformer,
  ConfirmationModal,
  vacancyFilterElementsIds,
} from "@shared/ui";

interface Props {
  filters: VacancyParams["filters"];
  setShowAdditional: Dispatch<SetStateAction<boolean>>;
}

export const VacancyFilterAdditional: React.FC<Props> = ({
  filters,
  setShowAdditional,
}) => {
  const {
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
    handleInvalid,
    highlightedFilters,
    highlightedSources,
    isModalOpen,
    setModalOpen,
    modalText,
    informerRef,
    incompatibleFiltersRef,
    onConfirm,
    openModal,
  } = useVacancyFilterAdditional(filters, setShowAdditional);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <ConfirmationModal
        open={isModalOpen}
        setOpen={setModalOpen}
        handleConfirm={onConfirm}
        confirmButtonText="Сбросить"
        ariaDescribedById={vacancyFilterElementsIds.modalDescription}
      >
        <span style={{ display: "block" }}>{modalText}</span>
        <span>
          {incompatibleFiltersRef.current?.map((filter, index, array) => (
            <span key={filter}>
              <b>{filter}</b>
              {index < array.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      </ConfirmationModal>
      <AriaInformer
        aria-live="assertive"
        forwardRef={informerRef}
      ></AriaInformer>
      <Grid2 container mt={2}>
        <Grid2 size={12} mb={1}>
          <Divider orientation="horizontal" sx={{ mb: 1 }} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }} pr={{ xs: 0, sm: 2 }}>
          <BasicFilters
            period={period}
            type={type}
            place={place}
            handlePeriodChange={handlePeriodChange}
            handleTypeChange={handleTypeChange}
            handlePlaceInputChange={handlePlaceInputChange}
            handlePlaceChange={handlePlaceChange}
            suggestedPlaces={suggestedPlaces}
            formattedPlace={formattedPlace}
            resetFiltersAndSources={resetFiltersAndSources}
            handleInvalid={handleInvalid}
            highlightedFilters={highlightedFilters}
            openModal={openModal}
          />
        </Grid2>
        {isSmUp && (
          <Divider flexItem orientation="vertical" sx={{ mr: "-1px" }} />
        )}
        <Grid2
          size={{ xs: 12, sm: 9 }}
          pl={{ xs: 0, sm: 3 }}
          pr={{ xs: 0, sm: 1 }}
          pt={{ xs: 1, sm: 0 }}
        >
          <SalaryCheckbox
            salaryFilter={salaryFilter}
            handleSalaryChange={handleSalaryChange}
            highlightedFilters={highlightedFilters}
          />
          <SalaryFilter
            handleSalaryChange={handleSalaryChange}
            salaryFilter={salaryFilter}
            handleInvalid={handleInvalid}
          />
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 2 }} />
      <SourceSelection
        sources={sources}
        handleSourceChange={handleSourceChange}
        highlightedSources={highlightedSources}
      />
      {!isSmUp && (
        <>
          <Divider sx={{ mt: 2, mb: 0.5 }} />
          <Button
            color="warning"
            size="small"
            onClick={() =>
              openModal(
                "Вы уверены, что хотите сбросить фильтры?",
                resetFiltersAndSources,
              )
            }
            sx={{ width: "100%" }}
            aria-label="Сбросить все фильтры"
          >
            Сбросить фильтры
          </Button>
        </>
      )}
    </>
  );
};
