import { VacancyCard } from '@widgets/VacancyCard';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

interface Props {
  variant?: 'default' | 'demo';
  href?: string;
}

export const VacancyList: React.FC<Props> = ({ variant='default', href='' }) => {
  const count = variant === 'demo' ? 1 : 10;
  const [searchQuery, setSearchQuery] = useState('');
  const { params, setPage, setFilters, vacancies, isVacanciesLoading } = useVacancyList({page: 0, count: 1, filters: {text: ''}});

  return (
    <Box>
      <Box sx={{display: 'flex', alignItems: 'center'}} >
        <TextField 
          label='Поиск вакансий по названию' 
          variant='outlined' 
          fullWidth 
          size='small'
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{marginBottom: '0.5em'}} 
        />
        <Button variant='contained' sx={{height: '100%', marginLeft: '0.5em'}} onClick={() => setFilters({text: searchQuery})} >
          <Search sx={{width: '100%'}} />
        </Button>
      </Box>
      <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
        {vacancies.map((data, i) => (
          <VacancyCard key={i} data={data} />
        ))}
        {isVacanciesLoading && (
          <CircularProgress size='5em' />
        )}
        <Button variant='contained' href={href} onClick={() => setPage(params.page + 1)} >Показать ещё</Button>
      </Stack>
    </Box>
  );
}
