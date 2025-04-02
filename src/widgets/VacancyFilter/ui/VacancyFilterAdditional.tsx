import { VacancyParams } from '@entities/Vacancy';
import { Divider, Grid2, Box } from '@mui/material';
import { SalaryFilter } from './SalaryFilter';
import { SourceSelection } from './SourceSelection';
import { BasicFilters } from './BasicFilters';
import { SalaryCheckbox } from './SalaryCheckbox';
import { useVacancyFilterAdditional } from '../model/useVacancyFilterAdditional';
import { Dispatch, SetStateAction } from 'react';

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
    highlightedSources
  } = useVacancyFilterAdditional(filters, setShowAdditional);

  return (
    <Box>
      <Grid2 container mt={2} >
        <Grid2 size={3} pr={2} >
          <BasicFilters 
            period={period} 
            type={type} 
            handlePeriodChange={handlePeriodChange} 
            handleTypeChange={handleTypeChange} 
            resetFiltersAndSources={resetFiltersAndSources}
            handleInvalid={handleInvalid}
            highlightedFilters={highlightedFilters}
          />
        </Grid2>
        <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />  
        <Grid2 size={9} pl={3} pr={1} >
          <SalaryCheckbox salaryFilter={salaryFilter} handleSalaryChange={handleSalaryChange} highlightedFilters={highlightedFilters} />
          <SalaryFilter handleSalaryChange={handleSalaryChange} salaryFilter={salaryFilter} handleInvalid={handleInvalid} />
        </Grid2>
      </Grid2>
      <Divider sx={{my: 2}} />
      <SourceSelection sources={sources} handleSourceChange={handleSourceChange} highlightedSources={highlightedSources} />
    </Box>
  );
};
