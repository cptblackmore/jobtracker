import { Box } from '@mui/material';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from '@widgets/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { VirtualizedVacancyList } from './VirtualizedVacancyList';
import { VACANCIES_COUNT_PER_SOURCE } from '@shared/config';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, toNextPage, setFilters, isLoading } = useVacancyList({page: 0, count: VACANCIES_COUNT_PER_SOURCE, filters: initialFilters});

  return (
    <Box>
      <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      <VirtualizedVacancyList 
        vacancies={state.vacancies}
        isLoading={isLoading}
        toNextPage={toNextPage}
      />
    </Box>
  );
}
