import { Box } from '@mui/material';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from '@widgets/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { useContext } from 'react';
import { AlertsContext, createAlert } from '@shared/model';
import { useEffectOnceByCondition } from '@shared/lib';
import { VirtualizedVacancyList } from './VirtualizedVacancyList';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ initialFilters={} }) => {
  const VACANCIES_COUNT_PER_SOURCE = 5;
  const { state, toNextPage, setFilters, isLoading } = useVacancyList({page: 0, count: VACANCIES_COUNT_PER_SOURCE, filters: initialFilters});
  const { alertsStore } = useContext(AlertsContext);

  useEffectOnceByCondition(() => {
    alertsStore.addAlert(createAlert('Прокручивайте страницу вниз, чтобы загрузить больше вакансий', 'info'));
  }, [isLoading], !isLoading)

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
