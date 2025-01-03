import { VacancyCard } from '@widgets/VacancyCard';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from './VacancyFilter/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';

interface Props {
  variant?: 'default' | 'demo';
  href?: string;
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ 
  variant='default', 
  href='/feed', 
  initialFilters={text: '', period: 1}
}) => {
  const count = variant === 'demo' ? 1 : 5;
  const { state, setPage, setFilters, isVacanciesLoading } = useVacancyList({page: 0, count, filters: initialFilters});

  return (
    <Box>
      {variant === 'default' && (
        <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      )}
      <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
        {state.vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isVacanciesLoading && (
          <CircularProgress size='5em' />
        )}
        <Box paddingTop={1} >
          {variant === 'default' ? (
            <Button variant='contained' onClick={() => setPage(state.params.page + 1)} >Показать ещё</Button>
          ) : (
            <Button variant='contained' href={href} >Найти больше</Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
