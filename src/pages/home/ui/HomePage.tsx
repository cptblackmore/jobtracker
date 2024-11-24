import { Vacancy } from '@entities/VacancyCard';
import { Box, Container, css } from '@mui/material';
import { adapterSuperjob } from '@shared/api/adapters/adapterSuperjob';
import { useFetching, VacancyService } from '@shared/api';
import { VacancyList } from '@widgets/VacancyList';
import React, { useEffect, useState } from 'react';

export const HomePage: React.FC = () => { 
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [page, setPage] = useState<number>(0);
  const [fetchVacancies, isVacanciesLoading, vacanciesError] = useFetching(async () => {
    const response = await VacancyService.getAll(page);
    setVacancies([...vacancies, ...adapterSuperjob(response.data.objects)]);
  });

  useEffect(() => {
    fetchVacancies()
  }, [page])

  return (
    <Container 
      maxWidth='lg' 
      css={css`
        display: flex;
        justify-content: center;
        margin-bottom: 1em;
      `}
    >
      <Box maxWidth='md'>
        <VacancyList vacancies={vacancies} isVacanciesLoading={isVacanciesLoading} page={page} setPage={setPage} />
      </Box>
    </Container>
  )
}
