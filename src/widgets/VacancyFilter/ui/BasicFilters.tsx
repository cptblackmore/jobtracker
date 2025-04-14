import { SwitchableVacancyType, VacancyParams, VacancyPeriod } from '@entities/Vacancy/api/types/VacancyParams';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, useMediaQuery, useTheme } from '@mui/material';
import { filterLabelsMap } from '../model/filterLabelsMap';
import { ChangeEvent } from 'react';
import { PlaceFilter } from './PlaceFilter';
import { getHighlightedBorderStyle, getHighlightedColorStyle, getMenuItemStyle, getSelectTypographyStyle } from './styles';
import { Places } from '@entities/Vacancy';

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
              ...getSelectTypographyStyle(theme),
              fieldset: {
                transition: 'border-color 0.2s',
                ...getHighlightedBorderStyle(highlightedFilters, 'period')
              }
            }}
          >
            <MenuItem value={1} sx={getMenuItemStyle(theme)} >1 день</MenuItem>
            <MenuItem value={3} sx={getMenuItemStyle(theme)} >3 дня</MenuItem>
            <MenuItem value={7} sx={getMenuItemStyle(theme)} >7 дней</MenuItem>
            <MenuItem value={0} sx={getMenuItemStyle(theme)} >Без ограничения</MenuItem>
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
              ...getSelectTypographyStyle(theme),
              fieldset: {
                transition: 'border-color 0.2s',
                ...getHighlightedBorderStyle(highlightedFilters, 'type')
              }
            }}
          >
            <MenuItem value={'none'} sx={getMenuItemStyle(theme)} >Не выбрано</MenuItem>
            <MenuItem value={'full'} sx={getMenuItemStyle(theme)} >Полный день</MenuItem>
            <MenuItem value={'shift'} sx={getMenuItemStyle(theme)} >Сменный график</MenuItem>
            <MenuItem value={'fifo'} sx={getMenuItemStyle(theme)} >Вахтовый метод</MenuItem>
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
