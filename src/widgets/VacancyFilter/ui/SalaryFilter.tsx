import { SwitchableVacancySalary } from '@entities/Vacancy/api/types/VacancyParams';
import { Box, Slider, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { SalaryFilterAction } from '../model/useSalaryFitler';
import { SALARY_MAX, SALARY_MIN, SALARY_STEP } from '@shared/config';

interface Props {
  handleSalaryChange: ({ action, payload }: SalaryFilterAction) => void;
  salaryFilter: SwitchableVacancySalary;
  handleInvalid: () => void
}

export const SalaryFilter: React.FC<Props> = ({ handleSalaryChange, salaryFilter, handleInvalid }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const salaryInputStyle = {
    '& .MuiInputBase-root': {fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize}},
    '& .MuiInputLabel-root': {fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize}},
  }
  
  return (
    <Box sx={{opacity: salaryFilter.enabled ? 1 : 0.5}} >
      <Box px={{xs: 1.5, sm: 1}} >
        <Slider
          value={[salaryFilter?.from ?? SALARY_MIN, salaryFilter?.to ?? SALARY_MAX]}
          onChange={(_, newValue) => handleSalaryChange({action: 'slider', payload: newValue as number[]})}
          valueLabelDisplay='auto'
          min={SALARY_MIN}
          max={SALARY_MAX}
          step={SALARY_STEP}
          size={isSmUp ? 'medium' : 'small'}
          color='secondary'
          marks={[
            { value: SALARY_MIN, label: `${SALARY_MIN / 1000}k` },
            { value: Math.floor((SALARY_MAX - SALARY_MIN) / 2), label: `${Math.floor((SALARY_MAX - SALARY_MIN) / 2 / 1000)}k` },
            { value: SALARY_MAX, label: `${SALARY_MAX / 1000}k` },
          ]}
          slotProps={{
            markLabel: {
              style: {
                fontSize: isSmUp ? theme.typography.caption.fontSize : '0.7rem'
              }
            }
          }}
        />
      </Box>
      <Stack direction='row' spacing={{xs: 1, sm: 2}} mt={{xs: 0, sm: 2}} >
        <TextField
          label={filterLabelsMap.salaryFrom}
          name='salaryFrom'
          type='number'
          size='small'
          slotProps={{htmlInput: {step: SALARY_STEP, min: SALARY_MIN, max: SALARY_MAX}}}
          fullWidth
          value={salaryFilter?.from !== 0 ? salaryFilter?.from : ''}
          onInvalid={handleInvalid}
          onChange={(e) => handleSalaryChange({
            action: 'input', 
            payload: {field: 'from', value: Number(e.target.value)}
          })}
          sx={salaryInputStyle}
        />
        <TextField
          label={filterLabelsMap.salaryTo}
          name='salaryTo'
          type='number'
          size='small'
          slotProps={{htmlInput: {step: SALARY_STEP, min: SALARY_MIN, max: SALARY_MAX}}}
          fullWidth
          value={salaryFilter?.to !== 0 ? salaryFilter?.to : ''}
          onInvalid={handleInvalid}
          onChange={(e) => handleSalaryChange({
            action: 'input', 
            payload: {field: 'to', value: Number(e.target.value)}
          })}
          sx={salaryInputStyle}
        />
      </Stack>
    </Box>
  );
};
