import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from '@widgets/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { VirtualizedVacancyList } from './VirtualizedVacancyList';
import { VACANCIES_COUNT_PER_SOURCE } from '@shared/config';
import { useEffectOnceByCondition } from '@shared/lib';
import { createAlert } from '@shared/model';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, toNextPage, alertsStore, setFilters, isLoading } = useVacancyList({page: 0, count: VACANCIES_COUNT_PER_SOURCE, filters: initialFilters});

  useEffectOnceByCondition(() => {
    alertsStore.addAlert(createAlert(
      'Прокручивайте страницу вниз, чтобы загрузить больше вакансий', 
      'info', 
      4000,
      'scroll-down-hint',
      'scroll-down-hint'
    ));
  }, [isLoading], !isLoading);

  return (
    <>
      <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      <VirtualizedVacancyList 
        vacancies={state.vacancies}
        isLoading={isLoading}
        toNextPage={toNextPage}
      />
    </>
  );
}
