import { SwitchableVacancyType, VacancyParams, VacancyPeriod } from '@entities/Vacancy/api/types/VacancyParams';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { getHighlightedBorderStyle, getHighlightedColorStyle } from './highlightedFiltersStyles';

interface Props {
  period: VacancyPeriod;
  type: SwitchableVacancyType;
  handlePeriodChange: (e: SelectChangeEvent<VacancyPeriod>) => void;
  handleTypeChange: (e: SelectChangeEvent<SwitchableVacancyType>) => void;
  resetFiltersAndSources: () => void;
  handleInvalid: () => void;
  highlightedFilters: Array<keyof VacancyParams['filters']>
}

export const BasicFilters: React.FC<Props> = ({ 
  period, 
  type, 
  handlePeriodChange, 
  handleTypeChange, 
  resetFiltersAndSources,
  handleInvalid,
  highlightedFilters
}) => {
  return (
    <Stack spacing={2} >
      <FormControl>
        <InputLabel sx={{...getHighlightedColorStyle(highlightedFilters, 'period')}} htmlFor='period' >
          {filterLabelsMap.period}
        </InputLabel>
        <Select
          fullWidth
          label={filterLabelsMap.period}
          inputProps={{id: 'period'}}
          name='period'
          value={period} 
          size='small'
          onInvalid={handleInvalid}
          onChange={(e) => handlePeriodChange(e)}
          sx={{
            fieldset: {
              transition: 'border-color 0.2s',
              ...getHighlightedBorderStyle(highlightedFilters, 'period')
            }
          }}
        >
          <MenuItem value={1} >1 день</MenuItem>
          <MenuItem value={3} >3 дня</MenuItem>
          <MenuItem value={7} >7 дней</MenuItem>
          <MenuItem value={0} >Без ограничения</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel sx={{...getHighlightedColorStyle(highlightedFilters, 'type')}} htmlFor='type' >
          {filterLabelsMap.type}
        </InputLabel>
        <Select
          fullWidth
          label={filterLabelsMap.type}
          name='type'
          inputProps={{id: 'type'}}
          value={type} 
          size='small'
          onInvalid={handleInvalid}
          onChange={(e) => handleTypeChange(e)}
          sx={{
            fieldset: {
              transition: 'border-color 0.2s',
              ...getHighlightedBorderStyle(highlightedFilters, 'type')
            }
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
