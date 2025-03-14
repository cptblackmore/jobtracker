import { SwitchableVacancySalary } from '@entities/Vacancy/api/types/VacancyParams';
import { Info } from '@mui/icons-material';
import { Box, Checkbox, Fade, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { SalaryFilterAction } from '../model/useSalaryFitler';

interface Props {
  salaryFilter: SwitchableVacancySalary;
  handleSalaryChange: ({ action, payload }: SalaryFilterAction) => void;
}

export const SalaryCheckbox: React.FC<Props> = ({ salaryFilter, handleSalaryChange }) => {
  return (
    <Box>
      <FormControlLabel
        label={filterLabelsMap.enableSalary + ' (₽)'}
        control={
          <Checkbox 
            checked={!!salaryFilter.enabled} 
            onChange={() => handleSalaryChange({action: 'toggle'})} 
            name='salary' 
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
          <Info sx={{fontSize: '0.8em'}} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
