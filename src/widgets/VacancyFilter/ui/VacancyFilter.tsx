import { VacancyParams } from '@entities/Vacancy';
import { FilterList, FilterListOff } from '@mui/icons-material';
import { Button, Collapse, FormControl, Paper, Stack, TextField } from '@mui/material';
import { ToggleIconButton } from '@shared/ui';
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

  return (
    <Paper 
      sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }} 
      component='form'
      onSubmit={handleSubmit}
    >
      <Stack direction='row' spacing={2} justifyContent='end' >
        <FormControl fullWidth >
          <TextField
            label={filterLabelsMap.text}
            name='text'
            variant='outlined'
            size='small'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormControl>
        <ToggleIconButton 
          isToggled={showAdditional} 
          onToggle={() => setShowAdditional((prev) => !prev)} 
          defaultIcon={<FilterList color='primary' />}
          toggledIcon={<FilterListOff color='primary' />}
          defaultTooltip='Показать дополнительные фильтры'
          toggledTooltip='Скрыть дополнительные фильтры'
        />
        <Button variant='contained' color='primary' type='submit' >
          Искать
        </Button>
      </Stack>
      <Collapse in={showAdditional} >
        <VacancyFilterAdditional filters={filters} setShowAdditional={setShowAdditional} />
      </Collapse>
    </Paper>
  );
};
