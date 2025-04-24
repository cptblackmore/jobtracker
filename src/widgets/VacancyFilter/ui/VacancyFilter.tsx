import { VacancyParams } from '@entities/Vacancy';
import { FilterList, FilterListOff } from '@mui/icons-material';
import { Button, Collapse, FormControl, Paper, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { ClearAdornment, ToggleIconButton, vacancyFilterElementsIds } from '@shared/ui';
import { VacancyFilterAdditional } from './VacancyFilterAdditional';
import { useVacancyFilter } from '../model/useVacancyFilter';
import { filterLabelsMap } from '../model/filterLabelsMap';

interface Props {
  filters: VacancyParams['filters'];
  setFilters: (filters: VacancyParams['filters']) => void;
}

export const VacancyFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const {
    showAdditional,
    setShowAdditional,
    text,
    setText,
    handleSubmit
  } = useVacancyFilter(filters, setFilters);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Paper 
      sx={{p: {xs: 1, sm: 2}, borderRadius: 2, boxShadow: 2, mb: 2}} 
      component='form'
      onSubmit={handleSubmit}
    >
      <Stack direction='row' spacing={{xs: 1, sm: 2}} justifyContent='end' alignItems='center' >
        <FormControl fullWidth >
          <TextField
            id={vacancyFilterElementsIds.text}
            label={filterLabelsMap.text}
            name='text'
            variant='outlined'
            size='small'
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize}},
              '& .MuiInputLabel-root': {fontSize: {xs: '0.9rem', sm: theme.typography.body1.fontSize}}
            }}
            slotProps={{
              input: {
                endAdornment: <ClearAdornment onClear={() => setText('')} visible={!!text} />
              }
            }}
          />
        </FormControl>
        <ToggleIconButton 
          isToggled={showAdditional} 
          onToggle={() => setShowAdditional((prev) => !prev)} 
          defaultIcon={<FilterList color='primary' />}
          toggledIcon={<FilterListOff color='primary' />}
          defaultTooltip='Показать дополнительные фильтры'
          toggledTooltip='Скрыть дополнительные фильтры'
          options={{
            size: isSmUp ? 1.2 : 1,
            wrapperSize: isSmUp ? 1.5 : 1.3,
            tooltipEnterDelay: 500,
            tooltipLeaveDelay: 300
          }}
        />
        <Button variant='contained' color='primary' type='submit' sx={{py: 1, fontSize: {xs: '0.8rem', sm: theme.typography.button.fontSize}}} >
          Искать
        </Button>
      </Stack>
      <Collapse in={showAdditional} >
        <VacancyFilterAdditional filters={filters} setShowAdditional={setShowAdditional} />
      </Collapse>
    </Paper>
  );
};
