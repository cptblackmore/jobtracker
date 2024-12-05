import { VacancyCard } from '@widgets/VacancyCard';
import { Vacancy } from '@shared/api';
import { Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';

interface Props {
  vacancies: Array<Vacancy>;
  isVacanciesLoading: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const VacancyList: React.FC<Props> = ({ vacancies, isVacanciesLoading, page, setPage }) => {
  return (
    <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
      {vacancies.map((data, i) => <VacancyCard key={i} data={data} />)}
      {isVacanciesLoading && (
        <CircularProgress size='5em' />
      )}
      <Button variant='contained' onClick={() => setPage(page + 1)} >Показать ещё</Button>
    </Stack>
  );
};
