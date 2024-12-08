import { VacancyCard } from '@widgets/VacancyCard';
import { Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';

interface Props {
  variant?: 'default' | 'demo';
  href?: string;
}

export const VacancyList: React.FC<Props> = ({ variant='default', href='' }) => {
  const count = variant === 'demo' ? 1 : 10;
  const { page, setPage, vacancies, isVacanciesLoading } = useVacancyList(0, count);

  return (
    <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
      {vacancies.map((data, i) => (
        <VacancyCard key={i} data={data} />
      ))}
      {isVacanciesLoading && (
        <CircularProgress size='5em' />
      )}
      <Button variant='contained' href={href} onClick={() => setPage(page + 1)} >Показать ещё</Button>
    </Stack>
  );
}
