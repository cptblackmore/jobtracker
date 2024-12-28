import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { Header } from '@widgets/Header';
import { containerStyles } from './styles';

export const FeedPage: React.FC = () => {
  const pages: Record<string, [string, string]> = {
    home: ['Главная', '/home'],
    feed: ['Вакансии', '/feed'],
    favorites: ['Избранное', '/favorites']
  }; // TODO Replace this with context or something

  return (
    <Box>
      <Header pages={pages} />
      <Container maxWidth='lg' css={containerStyles} >
        <Box maxWidth='md'>
          <VacancyList/>
        </Box>
      </Container>
    </Box>
  );
}
