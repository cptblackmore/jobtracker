import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { PageTitle } from '@widgets/PageTitle';

export const SearchPage: React.FC = () => {
  return (
    <>
      <Container maxWidth='lg' >
        <Box py={{xs: 2, sm: 4}} >
          <PageTitle title='Поиск вакансий' />
          <VacancyList/>
        </Box>
      </Container>
    </>
  );
}
