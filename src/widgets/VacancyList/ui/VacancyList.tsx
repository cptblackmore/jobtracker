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
  const { state, setPage, setFilters, isLoading } = useVacancyList({page: 0, count: 5, filters: initialFilters});
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
        page={state.params.page}
        setPage={setPage}
      />
    </Box>
  );
}
