import { Vacancy } from '@shared/api';
import { Box, Container, css } from '@mui/material';
import { adapterHH, adapterSuperjob, adapterTrudvsem, useFetching, VacancyService } from '@shared/api';
import { VacancyList } from '@widgets/VacancyList';
import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@widgets/Header';

export const HomePage: React.FC = () => { 
  const [vacancies, setVacancies] = useState<Array<Vacancy>>([]);
  const [page, setPage] = useState<number>(0);
  const vacancyIDs = useRef<Set<string>>(new Set);
  const [fetchVacancies, isVacanciesLoading] = useFetching(async () => {
    const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all(
      [VacancyService.getSuperjob(page), VacancyService.getHH(page), VacancyService.getTrudvsem(page)]
    );
    const newVacancies = [...adapterSuperjob(responseSuperjob), ...adapterHH(responseHH), ...adapterTrudvsem(responseTrudvsem)];
    const uniqueVacancies = newVacancies.filter(vacancy => {
      if (!vacancyIDs.current.has(vacancy.id)) {
        vacancyIDs.current.add(vacancy.id);
        return true;
      } else return false;
    });
    setVacancies(prevVacancies => [...prevVacancies, ...uniqueVacancies]);
  });
  
  useEffect(() => {
    fetchVacancies()
  }, [page])

  return (
    <Box>
      <Header pages={['Главная']} />
      <Container 
        maxWidth='lg' 
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 1em;
          padding: 1em;
        `}
      >
        <Box maxWidth='md'>
          <VacancyList vacancies={vacancies} isVacanciesLoading={isVacanciesLoading} page={page} setPage={setPage} />
        </Box>
      </Container>
    </Box>
  )
}
