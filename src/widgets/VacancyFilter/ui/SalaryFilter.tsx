import { SwitchableVacancySalary } from '@entities/Vacancy/api/types/VacancyParams';
import { Box, Slider, Stack, TextField } from '@mui/material';
import { SALARY_MIN, SALARY_MAX, SALARY_STEP } from '../config/salaryConfig';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { SalaryFilterAction } from '../model/useSalaryFitler';

interface Props {
  handleSalaryChange: ({ action, payload }: SalaryFilterAction) => void;
  salaryFilter: SwitchableVacancySalary
}

export const SalaryFilter: React.FC<Props> = ({ handleSalaryChange, salaryFilter }) => {
  return (
    <Box sx={{opacity: salaryFilter.enabled ? 1 : 0.5}} >
      <Slider
        value={[salaryFilter?.from ?? SALARY_MIN, salaryFilter?.to ?? SALARY_MAX]}
        onChange={(_, newValue) => handleSalaryChange({action: 'slider', payload: newValue as number[]})}
        valueLabelDisplay='auto'
        min={SALARY_MIN}
        max={SALARY_MAX}
        step={SALARY_STEP}
        marks={[
          { value: SALARY_MIN, label: `${SALARY_MIN / 1000}k` },
          { value: Math.floor((SALARY_MAX - SALARY_MIN) / 2), label: `${Math.floor((SALARY_MAX - SALARY_MIN) / 2 / 1000)}k` },
          { value: SALARY_MAX, label: `${SALARY_MAX / 1000}k` },
        ]}
      />
      <Stack direction='row' spacing={2} mt={2} >
        <TextField
          label={filterLabelsMap.salaryFrom}
          name='salaryFrom'
          type='number'
          size='small'
          slotProps={{htmlInput: {step: SALARY_STEP, min: SALARY_MIN, max: SALARY_MAX}}}
          fullWidth
          value={salaryFilter?.from !== 0 ? salaryFilter?.from : ''}
          onChange={(e) => handleSalaryChange({
            action: 'input', 
            payload: {field: 'from', value: Number(e.target.value)}
          })}
        />
        <TextField
          label={filterLabelsMap.salaryTo}
          name='salaryTo'
          type='number'
          size='small'
          slotProps={{htmlInput: {step: SALARY_STEP, min: SALARY_MIN, max: SALARY_MAX}}}
          fullWidth
          value={salaryFilter?.to !== 0 ? salaryFilter?.to : ''}
          onChange={(e) => handleSalaryChange({
            action: 'input', 
            payload: {field: 'to', value: Number(e.target.value)}
          })}
        />
      </Stack>
    </Box>
  );
};
