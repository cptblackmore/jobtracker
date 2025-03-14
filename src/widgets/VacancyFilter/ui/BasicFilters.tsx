import { SwitchableVacancyType, VacancyPeriod } from '@entities/Vacancy/api/types/VacancyParams';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';

interface Props {
  period: VacancyPeriod;
  type: SwitchableVacancyType;
  handlePeriodChange: (e: SelectChangeEvent<VacancyPeriod>) => void;
  handleTypeChange: (e: SelectChangeEvent<SwitchableVacancyType>) => void;
  resetFiltersAndSources: () => void;
}

export const BasicFilters: React.FC<Props> = ({ 
  period, 
  type, 
  handlePeriodChange, 
  handleTypeChange, 
  resetFiltersAndSources 
}) => {
  return (
    <Stack spacing={2} >
      <FormControl>
        <InputLabel htmlFor='period' >{filterLabelsMap.period}</InputLabel>
        <Select
          fullWidth
          label={filterLabelsMap.period}
          inputProps={{id: 'period'}}
          name='period'
          value={period} 
          size='small'
          onChange={(e) => handlePeriodChange(e)}
        >
          <MenuItem value={1} >1 день</MenuItem>
          <MenuItem value={3} >3 дня</MenuItem>
          <MenuItem value={7} >7 дней</MenuItem>
          <MenuItem value={0} >Без ограничения</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='type'>{filterLabelsMap.type}</InputLabel>
        <Select
          fullWidth
          label={filterLabelsMap.type}
          name='type'
          inputProps={{id: 'type'}}
          value={type} 
          size='small'
          onChange={(e) => handleTypeChange(e)}
          sx={{
            '& .MuiSelect-select': {color: type === 'none' ? 'text.secondary' : 'text.primary'}
          }}
        >
          <MenuItem value={'none'} >Не выбрано</MenuItem>
          <MenuItem value={'full'} >Полный день</MenuItem>
          <MenuItem value={'shift'} >Сменный график</MenuItem>
          <MenuItem value={'fifo'} >Вахтовый метод</MenuItem>
        </Select>
      </FormControl>
      <Button color='warning' onClick={resetFiltersAndSources} >Сбросить фильтры</Button>
    </Stack>
  );
};
