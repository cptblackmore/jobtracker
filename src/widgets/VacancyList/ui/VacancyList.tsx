import { VacancyCard } from '@widgets/VacancyCard';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from './VacancyFilter/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { AlertsContext } from '@shared/model';
import { useContext } from 'react';

interface Props {
  variant?: 'default' | 'demo';
  href?: string; // TODO replace by route
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ 
  variant='default', 
  href='/feed', // TODO replace by route
  initialFilters={sources: ['superjob', 'hh', 'trudvsem']}
}) => {
  const count = variant === 'demo' ? 1 : 5;
  const { alertsStore } = useContext(AlertsContext);
  const { state, setPage, setFilters, isLoading } = useVacancyList({page: 0, count, filters: initialFilters}, alertsStore);

  return (
    <Box>
      {variant === 'default' && (
        <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      )}
      <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
        {state.vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isLoading && (
          <CircularProgress size='5em' />
        )}
        <Box paddingTop={1} >
          {variant === 'default' ? (
            <Button variant='contained' onClick={() => setPage(state.params.page + 1)} >Показать ещё</Button>
          ) : (
            <Button variant='contained' href={href} >Найти больше</Button> // TODO replace href by route
          )}
        </Box>
      </Stack>
    </Box>
  );
}
