import { VacancyCard } from "@entities/VacancyCard";
import { Vacancy } from "@shared/api";
import { Button, CircularProgress, css, Stack } from "@mui/material";

interface Props {
  vacancies: Array<Vacancy>;
  isVacanciesLoading: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const VacancyList: React.FC<Props> = ({ vacancies, isVacanciesLoading, page, setPage }) => {
  return (
    <Stack
      direction='column'
      alignItems='center'
      spacing={1}
      css={css`
        padding: 1em;
        background-color: #50506e;
        border-radius: 10px;
      `}
    >
      {vacancies.map((data, i) => <VacancyCard key={i} data={data} />)}
      {isVacanciesLoading
      &&
      <CircularProgress size='5em' />}
      <Button variant='contained' onClick={() => setPage(page + 1)} >Показать ещё</Button>
    </Stack>
  );
};
