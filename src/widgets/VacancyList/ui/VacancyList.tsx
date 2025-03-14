import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from './VacancyFilter/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { useInView } from 'react-intersection-observer'
import { useContext, useEffect } from 'react';
import { AlertsContext, createAlert } from '@shared/model';
import { useEffectOnceByCondition } from '@shared/lib';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, setPage, setFilters, isLoading } = useVacancyList({page: 0, count: 5, filters: initialFilters});
  const { ref, inView } = useInView({triggerOnce: true});
  const { alertsStore } = useContext(AlertsContext);

  useEffect(() => {
    if (inView) setPage(state.params.page + 1);
  }, [inView]);

  useEffectOnceByCondition(() => {
    alertsStore.addAlert(createAlert('Прокручивайте страницу вниз, чтобы загрузить больше вакансий', 'info'));
  }, [isLoading], !isLoading)

  return (
    <Box>
      <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
        {state.vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isLoading ? (
          <CircularProgress size='5em' />
        ) : (
          <Box ref={ref} ></Box>
        )}
      </Stack>
    </Box>
  );
}
