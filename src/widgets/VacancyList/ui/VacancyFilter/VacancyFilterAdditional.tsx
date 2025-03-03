import { VacancyParams } from '@entities/Vacancy';
import { Divider, Grid2, Box } from '@mui/material';
import { useVacancyFilterAdditional } from '@widgets/VacancyList/model/VacancyFilter/useVacancyFilterAdditional';
import { SalaryFilter } from './SalaryFilter';
import { SourceSelection } from './SourceSelection';
import { BasicFilters } from './BasicFilters';
import { SalaryCheckbox } from './SalaryCheckbox';

interface Props {
  filters: VacancyParams['filters'];
}

export const VacancyFilterAdditional: React.FC<Props> = ({ filters }) => {
  const { 
    period, 
    handlePeriodChange, 
    type, 
    handleTypeChange, 
    salaryFilter, 
    handleSalaryChange,
    sources, 
    handleSourceChange, 
    resetFiltersAndSources
  } = useVacancyFilterAdditional(filters);

  return (
    <Box>
      <Grid2 container mt={2} >
        <Grid2 size={3} pr={2} >
          <BasicFilters period={period} type={type} handlePeriodChange={handlePeriodChange} handleTypeChange={handleTypeChange} resetFiltersAndSources={resetFiltersAndSources} />
        </Grid2>
        <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />  
        <Grid2 size={9} pl={3} pr={1} >
          <SalaryCheckbox salaryFilter={salaryFilter} handleSalaryChange={handleSalaryChange} />
          <SalaryFilter handleSalaryChange={handleSalaryChange} salaryFilter={salaryFilter} />
        </Grid2>
      </Grid2>
      <Divider sx={{my: 2}} />
      <SourceSelection sources={sources} handleSourceChange={handleSourceChange} />
    </Box>
  );
};
