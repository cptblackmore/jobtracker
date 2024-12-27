import { VacancyParams } from "@entities/Vacancy";
import { Box, Stack, Select, MenuItem, Divider, Slider, TextField, Typography as T } from "@mui/material";
import { Action } from "../../model/VacancyFilter/vacancyFilterReducer";

interface Props {
  state: VacancyParams['filters'];
  dispatch: React.Dispatch<Action>;
}

export const VacancyFilterAdditional: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <Box sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: 1, boxSizing: 'border-box' }} >
      <Stack direction='row' >              
        <Box sx={{ width: '20%'}} >
          <T gutterBottom >Период размещения</T>
          <Select 
            value={state?.period ?? 1} 
            size='small'
            fullWidth 
            onChange={(e) => dispatch({
              type: 'SET_PERIOD', 
              period: Number(e.target.value) as VacancyParams['filters']['period']
            })} 
          >
            <MenuItem value={1} >1 день</MenuItem>
            <MenuItem value={3} >3 дня</MenuItem>
            <MenuItem value={7} >7 дней</MenuItem>
            <MenuItem value={0} >Без ограничения</MenuItem>
          </Select>
        </Box>
        <Divider flexItem orientation='vertical' sx={{mx: 2}} />
        <Box sx={{ width: '80%' }} >
          <T gutterBottom>Диапазон зарплаты (₽)</T>
          <Box sx={{px: 2}} >
            <Slider
              value={[state?.salary?.from ?? 0, state?.salary?.to ?? 0]}
              onChange={(e, newValue) => dispatch({
                type: 'HANDLE_SALARY_SLIDER_CHANGE',
                salary: {
                  from: Array.isArray(newValue) ? newValue[0] : newValue, 
                  to: Array.isArray(newValue) ? newValue[1] : newValue
                }
              })}
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
          </Box>
          <Stack direction="row" spacing={2} mt={2} >
            <TextField
              label='Мин. зарплата'
              type='number'
              size='small'
              fullWidth
              value={state?.salary?.from ?? 0}
              onChange={(e) => dispatch({
                type: 'SET_SALARY_FROM', 
                salary: {from: Number(e.target.value)}
              })}
            />
            <TextField
              label='Макс. зарплата'
              type='number'
              size='small'
              fullWidth
              value={state?.salary?.to ?? 0}
              onChange={(e) => dispatch({
                type: 'SET_SALARY_TO', 
                salary: {to: Number(e.target.value)}
              })}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
