import { VacancyParams } from "@entities/Vacancy";
import { Stack, MenuItem, Divider, Slider, TextField, Grid2, FormLabel } from "@mui/material";
import { Action } from "../../model/VacancyFilter/vacancyFilterReducer";

interface Props {
  state: VacancyParams['filters'];
  dispatch: React.Dispatch<Action>;
}

export const VacancyFilterAdditional: React.FC<Props> = ({ state, dispatch }) => {
  function handleSliderChange(newValue: number[]) {
    dispatch({
      type: 'HANDLE_SALARY_SLIDER_CHANGE',
      salary: {from: newValue[0], to: newValue[1]}
    })
  }

  const handleSalaryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'from' | 'to'
  ) => {
    dispatch({
      type: field === 'from' ? 'SET_SALARY_FROM' : 'SET_SALARY_TO',
      salary: {[field]: Number(e.target.value)}
    });
  };

  return (
    <Grid2 container mt={2} >
      <Grid2 size={3} pr={2} >
        <TextField
          fullWidth
          label='Период размещения'
          name='period'
          select
          value={state?.period ?? 1} 
          size='small'
          onChange={(e) => dispatch({
            type: 'SET_PERIOD', 
            period: Number(e.target.value) as VacancyParams['filters']['period']
          })} 
        >
          <MenuItem value={1} >1 день</MenuItem>
          <MenuItem value={3} >3 дня</MenuItem>
          <MenuItem value={7} >7 дней</MenuItem>
          <MenuItem value={0} >Без ограничения</MenuItem>
        </TextField>
      </Grid2>

      <Divider flexItem orientation='vertical' sx={{mr: '-1px'}} />
      
      <Grid2 size={9} pl={3} pr={1} >
        <FormLabel component='legend' sx={{px: 2, fontSize: '0.8em'}} >Диапазон зарплат (₽)</FormLabel>
        <Slider
          value={[state?.salary?.from ?? 0, state?.salary?.to ?? 0]}
          onChange={(_, newValue) => handleSliderChange(newValue as number[])}
          valueLabelDisplay='auto'
          min={0}
          max={200000}
          step={1000}
          marks={[
            { value: 0, label: '0' },
            { value: 100000, label: '100k' },
            { value: 200000, label: '200k' },
          ]}
        />
        <Stack direction='row' spacing={2} mt={2} >
          <TextField
            label='Мин. зарплата'
            name='salaryFrom'
            type='number'
            size='small'
            fullWidth
            value={state?.salary?.from ?? 0}
            onChange={(e) => handleSalaryChange(e, 'from')}
          />
          <TextField
            label='Макс. зарплата'
            name='salaryTo'
            type='number'
            size='small'
            fullWidth
            value={state?.salary?.to ?? 0}
            onChange={(e) => handleSalaryChange(e, 'to')}
          />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
