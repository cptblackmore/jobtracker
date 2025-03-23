import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { Typography as T } from '@mui/material';

export const FeedPage: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Container maxWidth='lg' >
        <Box my={4} >
            <T 
              variant='h4' 
              gutterBottom
              ml={2}
              display='flex' 
              alignItems='center' 
              justifyContent='flex-start'
            >
              Поиск вакансий
            </T>
          <VacancyList/>
        </Box>
      </Container>
    </Box>
  );
}
