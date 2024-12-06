import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { Header } from '@widgets/Header';
import { containerStyles } from './styles';

export const HomePage: React.FC = () => {
  return (
    <Box>
      <Header pages={['Главная']} />
      <Container maxWidth='lg' css={containerStyles} >
        <Box maxWidth='md'>
          <VacancyList />
        </Box>
      </Container>
    </Box>
  );
}
