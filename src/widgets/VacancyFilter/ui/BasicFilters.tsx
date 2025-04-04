import { SwitchableVacancyType, VacancyParams, VacancyPeriod } from '@entities/Vacancy/api/types/VacancyParams';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, useMediaQuery, useTheme } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { getHighlightedBorderStyle, getHighlightedColorStyle } from './highlightedFiltersStyles';

interface Props {
  period: VacancyPeriod;
  type: SwitchableVacancyType;
  handlePeriodChange: (e: SelectChangeEvent<VacancyPeriod>) => void;
  handleTypeChange: (e: SelectChangeEvent<SwitchableVacancyType>) => void;
  resetFiltersAndSources: () => void;
  handleInvalid: () => void;
  highlightedFilters: Array<keyof VacancyParams['filters']>;
  openModal: (text: string, onReset: () => void) => void
}

export const BasicFilters: React.FC<Props> = ({ 
  period, 
  type, 
  handlePeriodChange, 
  handleTypeChange, 
  resetFiltersAndSources,
  handleInvalid,
  highlightedFilters,
  openModal
}) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const menuItemStyle = {
    fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize},
    minHeight: {xs: 40, sm: 48}
  };
  const selectStyle = {
    '& .MuiSelect-select': {fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize}}
  }

  return (
    <Stack direction={isSmUp ? 'column' : 'row'} spacing={{xs: 1, sm: 2}} >
      <FormControl sx={{flexGrow: 1}} >
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
            ...selectStyle,
            fieldset: {
              transition: 'border-color 0.2s',
              ...getHighlightedBorderStyle(highlightedFilters, 'period')
            }
          }}
        >
          <MenuItem value={1} sx={menuItemStyle} >1 день</MenuItem>
          <MenuItem value={3} sx={menuItemStyle} >3 дня</MenuItem>
          <MenuItem value={7} sx={menuItemStyle} >7 дней</MenuItem>
          <MenuItem value={0} sx={menuItemStyle} >Без ограничения</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{flexGrow: 1}} >
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
            ...selectStyle,
            fieldset: {
              transition: 'border-color 0.2s',
              ...getHighlightedBorderStyle(highlightedFilters, 'type')
            }
          }}
        >
          <MenuItem value={'none'} sx={menuItemStyle} >Не выбрано</MenuItem>
          <MenuItem value={'full'} sx={menuItemStyle} >Полный день</MenuItem>
          <MenuItem value={'shift'} sx={menuItemStyle} >Сменный график</MenuItem>
          <MenuItem value={'fifo'} sx={menuItemStyle} >Вахтовый метод</MenuItem>
        </Select>
      </FormControl>
      {isSmUp && (
        <Button 
          color='warning' 
          onClick={() => openModal('Вы уверены, что хотите сбросить фильтры?', resetFiltersAndSources)} 
        >
          Сбросить фильтры
        </Button>
      )}
    </Stack>
  );
};
