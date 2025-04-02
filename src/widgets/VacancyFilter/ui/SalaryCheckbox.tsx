import { SwitchableVacancySalary, VacancyParams } from '@entities/Vacancy/api/types/VacancyParams';
import { Info } from '@mui/icons-material';
import { Box, Checkbox, Fade, FormControlLabel, IconButton, Tooltip, Typography } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { SalaryFilterAction } from '../model/useSalaryFitler';
import { getHighlightedColorStyle } from './highlightedFiltersStyles';

interface Props {
  salaryFilter: SwitchableVacancySalary;
  handleSalaryChange: ({ action, payload }: SalaryFilterAction) => void;
  highlightedFilters: Array<keyof VacancyParams['filters']>
}

export const SalaryCheckbox: React.FC<Props> = ({ salaryFilter, handleSalaryChange, highlightedFilters }) => {
  return (
    <Box>
      <FormControlLabel
        label={
          <Typography sx={{...getHighlightedColorStyle(highlightedFilters, 'salary'), transition: 'color 0.2s'}} >
            {filterLabelsMap.enableSalary} (₽)
          </Typography>
        }
        control={
          <Checkbox 
            checked={!!salaryFilter.enabled} 
            onChange={() => handleSalaryChange({action: 'toggle'})} 
            name='salary'
            sx={{'& > svg': {...getHighlightedColorStyle(highlightedFilters, 'salary'), transition: 'color 0.2s'}}}
          />
        }
        sx={{mr: 0}}
      />
      <Tooltip 
        title='Сервисы вакансий стараются предоставить максимально соответствующие результаты по указанному диапозону зарплат, однако точность не гарантирована.'
        TransitionComponent={Fade}
        arrow
      >
        <IconButton >
          <Info sx={{fontSize: '0.8em', ...getHighlightedColorStyle(highlightedFilters, 'salary'), transition: 'color 0.2s'}} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
