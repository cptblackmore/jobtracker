import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { PageTitle } from '@widgets/PageTitle';

export const SearchPage: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Container maxWidth='lg' >
        <Box my={4} >
          <PageTitle title='Поиск вакансий' />
          <VacancyList/>
        </Box>
      </Container>
    </Box>
  );
}
