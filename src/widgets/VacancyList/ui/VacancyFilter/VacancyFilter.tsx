import { Sources, VacancyParams, VacancyPeriod, VacancyType } from '@entities/Vacancy';
import { FilterList, FilterListOff } from '@mui/icons-material';
import { Button, Collapse, FormControl, Paper, Stack, TextField } from '@mui/material';
import { ToggleIconButton } from '@shared/ui';
import { VacancyFilterAdditional } from './VacancyFilterAdditional';
import { useState } from 'react';

interface Props {
  filters: VacancyParams['filters'];
  setFilters: (filters: VacancyParams['filters']) => void;
}

export const VacancyFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [text, setText] = useState(filters?.text ?? '');
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newFilters: VacancyParams['filters'] = {
      text: formData.get('text') as string,
      period: Number(formData.get('period')) as VacancyPeriod,
      salary: formData.get('salary') === 'on' ? {from: Number(formData.get('salaryFrom')), to: Number(formData.get('salaryTo'))} : undefined,
      type: formData.get('type') !== 'none' ? formData.get('type') as VacancyType : undefined,
      sources: Array.from(formData.getAll('source') as Iterable<string>).map((source) => source as Sources)
    };

    setFilters(newFilters);
  }

  return (
    <Paper 
      sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2 }} 
      component='form'
      onSubmit={handleSubmit}
    >
      <Stack spacing={2} >
        <Stack direction='row' spacing={2} justifyContent='end' >
          <FormControl fullWidth >
            <TextField
              label='Поиск вакансий'
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
            toggledIcon={<FilterListOff />}
            defaultTooltip='Дополнительные фильтры'
            toggledTooltip='Скрыть дополнительные фильтры'
          />
          <Button variant='contained' color='primary' type='submit' >
            Искать
          </Button>
        </Stack>
        <Collapse in={showAdditional}>
          <VacancyFilterAdditional filters={filters} />
        </Collapse>
      </Stack>
    </Paper>
  );
};
