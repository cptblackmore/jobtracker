import { Box, Container } from '@mui/material';
import { VacancyList } from '@widgets/VacancyList';
import React from 'react';
import { Nav } from '@widgets/Nav';
import { containerStyles } from './styles';

export const FeedPage: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Container maxWidth='lg' css={containerStyles} >
        <Box maxWidth='md' sx={{width: '100%'}} >
          <VacancyList/>
        </Box>
      </Container>
    </Box>
  );
}
