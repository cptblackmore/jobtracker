import { SwitchableVacancyType, VacancyParams, VacancyPeriod } from '@entities/Vacancy/api/types/VacancyParams';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, useMediaQuery, useTheme } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { ChangeEvent } from 'react';
import { PlaceFilter } from './PlaceFilter';
import { getHighlightedBorderStyle, getHighlightedColorStyle, getMenuItemStyle, getSelectTypographyStyle } from './styles';
import { Places } from '@entities/Vacancy';
import { vacancyFilterElementsIds } from '@shared/ui';

interface Props {
  period: VacancyPeriod;
  type: SwitchableVacancyType;
  place: string;
  suggestedPlaces: Places;
  handlePeriodChange: (e: SelectChangeEvent<VacancyPeriod>) => void;
  handleTypeChange: (e: SelectChangeEvent<SwitchableVacancyType>) => void;
  handlePlaceInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePlaceChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formattedPlace: string;
  resetFiltersAndSources: () => void;
  handleInvalid: () => void;
  highlightedFilters: Array<keyof VacancyParams['filters']>;
  openModal: (text: string, onReset: () => void) => void
}

export const BasicFilters: React.FC<Props> = ({ 
  period, 
  type, 
  place,
  suggestedPlaces,
  handlePeriodChange, 
  handleTypeChange, 
  handlePlaceInputChange,
  handlePlaceChange,
  formattedPlace,
  resetFiltersAndSources,
  handleInvalid,
  highlightedFilters,
  openModal
}) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Stack direction={isSmUp ? 'column' : 'row'} spacing={{xs: 1, sm: 2}} >
        <FormControl sx={{flexGrow: 1}} >
          <InputLabel 
            id={vacancyFilterElementsIds.periodLabel}
            sx={{...getHighlightedColorStyle(highlightedFilters, 'period')}} 
          >
            {filterLabelsMap.period}
          </InputLabel>
          <Select
            id={vacancyFilterElementsIds.period}
            fullWidth
            labelId={vacancyFilterElementsIds.periodLabel}
            label={filterLabelsMap.period}
            name='period'
            value={period} 
            size='small'
            onInvalid={handleInvalid}
            onChange={(e) => handlePeriodChange(e)}
            sx={{
              ...getSelectTypographyStyle(theme),
              fieldset: {
                transition: 'border-color 0.2s',
                ...getHighlightedBorderStyle(highlightedFilters, 'period')
              }
            }}
          >
            <MenuItem value={1} sx={getMenuItemStyle(theme)} aria-selected={period === 1} >1 день</MenuItem>
            <MenuItem value={3} sx={getMenuItemStyle(theme)} aria-selected={period === 3} >3 дня</MenuItem>
            <MenuItem value={7} sx={getMenuItemStyle(theme)} aria-selected={period === 7} >7 дней</MenuItem>
            <MenuItem value={0} sx={getMenuItemStyle(theme)} aria-selected={period === 0} >Без ограничения</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{flexGrow: 1}} >
          <InputLabel 
            id={vacancyFilterElementsIds.typeLabel}
            sx={{...getHighlightedColorStyle(highlightedFilters, 'type')}}
          >
            {filterLabelsMap.type}
          </InputLabel>
          <Select
            fullWidth
            labelId={vacancyFilterElementsIds.typeLabel}
            label={filterLabelsMap.type}
            name='type'
            value={type} 
            size='small'
            onInvalid={handleInvalid}
            onChange={(e) => handleTypeChange(e)}
            sx={{
              ...getSelectTypographyStyle(theme),
              fieldset: {
                transition: 'border-color 0.2s',
                ...getHighlightedBorderStyle(highlightedFilters, 'type')
              }
            }}
          >
            <MenuItem value={'none'} sx={getMenuItemStyle(theme)} aria-selected={type === 'none'} >Не выбрано</MenuItem>
            <MenuItem value={'full'} sx={getMenuItemStyle(theme)} aria-selected={type === 'full'} >Полный день</MenuItem>
            <MenuItem value={'shift'} sx={getMenuItemStyle(theme)} aria-selected={type === 'shift'} >Сменный график</MenuItem>
            <MenuItem value={'fifo'} sx={getMenuItemStyle(theme)} aria-selected={type === 'fifo'} >Вахтовый метод</MenuItem>
          </Select>
        </FormControl>
        {isSmUp && (
          <>
            <PlaceFilter 
              place={place}
              suggestedPlaces={suggestedPlaces}
              handlePlaceInputChange={handlePlaceInputChange}
              handlePlaceChange={handlePlaceChange}
              formattedPlace={formattedPlace}
              handleInvalid={handleInvalid}
              highlightedFilters={highlightedFilters}
            />
            <Button 
              color='warning' 
              onClick={() => openModal('Вы уверены, что хотите сбросить фильтры?', resetFiltersAndSources)} 
              aria-label='Сбросить фильтры'
            >
              Сбросить фильтры
            </Button>
          </>
        )}
      </Stack>
      {!isSmUp && (
        <Box display='flex' mt={1} >
          <PlaceFilter 
            place={place}
            suggestedPlaces={suggestedPlaces}
            handlePlaceInputChange={handlePlaceInputChange}
            handlePlaceChange={handlePlaceChange}
            formattedPlace={formattedPlace}
            handleInvalid={handleInvalid}
            highlightedFilters={highlightedFilters}
          />
        </Box>
      )}
    </>
  );
};
