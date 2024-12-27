import { VacancyParams } from '@entities/Vacancy';
import { FilterList, FilterListOff } from '@mui/icons-material';
import { Button, Collapse, Paper, Stack, TextField } from '@mui/material';
import { ToggleIconButton } from '@shared/ui';
import { useVacancyFilter } from '../../model/VacancyFilter/useVacancyFilter';
import { VacancyFilterAdditional } from './VacancyFilterAdditional';

interface Props {
  filters: VacancyParams['filters'];
  setFilters: (filters: VacancyParams['filters']) => void;
}

export const VacancyFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const { showAdditional, setShowAdditional, state, dispatch } = useVacancyFilter(filters);

  return (
    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }} >
      <Stack spacing={2} >
        <Stack direction='row' spacing={2} justifyContent='end' >
          <TextField
            label='Поиск вакансий'
            variant='outlined'
            size='small'
            fullWidth
            value={state?.text ?? ''}
            onChange={(e) => dispatch({type: 'SET_TEXT', text: e.target.value})}
          />
          <ToggleIconButton 
            isToggled={showAdditional} 
            onToggle={() => setShowAdditional((prev) => !prev)} 
            defaultIcon={<FilterList color='primary' />}
            toggledIcon={<FilterListOff />}
            defaultTooltip='Дополнительные фильтры'
            toggledTooltip='Скрыть дополнительные фильтры'
          />
          <Button 
            variant='contained' 
            color='primary' 
            onClick={() => setFilters(state)}
          >
            Искать
          </Button>
        </Stack>
        <Collapse in={showAdditional}>
          <VacancyFilterAdditional state={state} dispatch={dispatch} />
        </Collapse>
      </Stack>
    </Paper>
  );
};
