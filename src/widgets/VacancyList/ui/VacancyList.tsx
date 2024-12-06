import { VacancyCard } from '@widgets/VacancyCard';
import { Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';

export const VacancyList: React.FC = () => {
  const { page, setPage, vacancies, isVacanciesLoading } = useVacancyList();

  return (
    <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
      {vacancies.map((data, i) => (
        <VacancyCard key={i} data={data} />
      ))}
      {isVacanciesLoading && (
        <CircularProgress size='5em' />
      )}
      <Button variant='contained' onClick={() => setPage(page + 1)} >Показать ещё</Button>
    </Stack>
  );
}
