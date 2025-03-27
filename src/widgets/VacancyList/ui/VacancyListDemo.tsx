import { VacancyCard } from '@widgets/VacancyCard';
import { CircularProgress, Stack } from '@mui/material';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyParams } from '@entities/Vacancy';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyListDemo: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, isLoading } = useVacancyList({page: 0, count: 1, filters: initialFilters});

  return (
    <Stack direction='column' alignItems='center' spacing={1} >
      {state.vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
      {isLoading && (
        <CircularProgress size='5em' />
      )}
    </Stack>
  );
}
