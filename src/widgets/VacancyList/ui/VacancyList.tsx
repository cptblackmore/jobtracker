import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyFilter } from '@widgets/VacancyFilter';
import { VacancyParams } from '@entities/Vacancy';
import { useContext } from 'react';
import { AlertsContext, createAlert } from '@shared/model';
import { useEffectOnceByCondition } from '@shared/lib';
import { Virtuoso } from 'react-virtuoso';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyList: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, setPage, setFilters, isLoading } = useVacancyList({page: 0, count: 50, filters: initialFilters});
  const { alertsStore } = useContext(AlertsContext);

  useEffectOnceByCondition(() => {
    alertsStore.addAlert(createAlert('Прокручивайте страницу вниз, чтобы загрузить больше вакансий', 'info'));
  }, [isLoading], !isLoading)

  return (
    <Box>
      <VacancyFilter filters={state.params.filters} setFilters={setFilters} />
      <Box css={vacancyListStyle} >
        <Virtuoso
          useWindowScroll
          increaseViewportBy={1200}
          data={state.vacancies}
          itemContent={(_, vacancy) => (
            <div key={vacancy.id} style={{paddingBottom: '1em'}} >
              <VacancyCard data={vacancy} />
            </div>
          )}
          endReached={() => {
            if (!isLoading) setPage(state.params.page + 1);
          }}
          components={{
            Footer: () =>
              isLoading ? (
                <Box display='flex' justifyContent='center' >
                  <CircularProgress size='5em' />
                </Box>
              ) : null
          }}
        />
      </Box>
    </Box>
  );
}
