import { VacancyParams } from '@entities/Vacancy';
import { Button, Divider, Grid2, Typography as T, useMediaQuery, useTheme } from '@mui/material';
import { SalaryFilter } from './SalaryFilter';
import { SourceSelection } from './SourceSelection';
import { BasicFilters } from './BasicFilters';
import { SalaryCheckbox } from './SalaryCheckbox';
import { useVacancyFilterAdditional } from '../model/useVacancyFilterAdditional';
import { Dispatch, SetStateAction } from 'react';
import { ConfirmationModal } from '@shared/ui';

interface Props {
  filters: VacancyParams['filters'];
  setShowAdditional: Dispatch<SetStateAction<boolean>>
}

export const VacancyFilterAdditional: React.FC<Props> = ({ filters, setShowAdditional }) => {
  const { 
    period, 
    handlePeriodChange, 
    type, 
    handleTypeChange, 
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
    incompatibleFiltersRef,
    onConfirm,
    openModal
  } = useVacancyFilterAdditional(filters, setShowAdditional);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <ConfirmationModal
        open={isModalOpen}
        setOpen={setModalOpen}
        handleConfirm={onConfirm}
        confirmButtonText='Сбросить'
      >
        <T>{modalText}</T>
        <T>
          {incompatibleFiltersRef.current?.map((filter, index, array) => (
            <span key={filter}>
              <b>{filter}</b>
              {index < array.length - 1 ? ', ' : ''}
            </span>
          ))}
        </T>
      </ConfirmationModal>
      <Grid2 container mt={2} >
        <Grid2 size={12} mb={1} >
          <Divider orientation='horizontal' sx={{mb: 1}} />
        </Grid2>
        <Grid2 size={{xs: 12, sm: 3}} pr={{xs: 0, sm: 2}} >
          <BasicFilters 
            period={period} 
            type={type} 
            handlePeriodChange={handlePeriodChange} 
            handleTypeChange={handleTypeChange} 
            resetFiltersAndSources={resetFiltersAndSources}
            handleInvalid={handleInvalid}
            highlightedFilters={highlightedFilters}
            openModal={openModal}
          />
        </Grid2>
        {isSmUp && <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />}
        <Grid2 size={{xs: 12, sm: 9}} pl={{xs: 0, sm: 3}} pr={{xs: 0, sm: 1}} pt={{xs: 1, sm: 0}} >
          <SalaryCheckbox salaryFilter={salaryFilter} handleSalaryChange={handleSalaryChange} highlightedFilters={highlightedFilters} />
          <SalaryFilter handleSalaryChange={handleSalaryChange} salaryFilter={salaryFilter} handleInvalid={handleInvalid} />
        </Grid2>
      </Grid2>
      <Divider sx={{my: 2}} />
      <SourceSelection sources={sources} handleSourceChange={handleSourceChange} highlightedSources={highlightedSources} />
      {!isSmUp && (
        <>
          <Divider sx={{mt: 2, mb: 0.5}} />
          <Button 
            color='warning'
            size='small'
            onClick={() => openModal('Вы уверены, что хотите сбросить фильтры?', resetFiltersAndSources)} 
            sx={{width: '100%'}}
          >
            Сбросить фильтры
          </Button>
        </>
      )}
    </>
  );
};
