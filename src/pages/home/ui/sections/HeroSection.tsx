import { Box, Button, Container } from '@mui/material';
import { Typography as T } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router'
import { CtaTitle } from './CtaTitle';

export const HeroSection: React.FC = () => {
  const { pages } = useContext(PagesContext);

  return (
    <Box
      component='section'
      sx={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Container maxWidth='md'>
        <T component='h1' variant='h1' gutterBottom >
          Добро пожаловать в JobTracker
        </T>
        <CtaTitle 
          title='Ваш универсальный инструмент для быстрого поиска вакансий с разных источников в один клик'
        />
        <Button 
          component={RouterLink}
          variant='contained' 
          size='large' 
          color='secondary'
          to={pages.search.path}
        >
          Найти вакансии
        </Button>
      </Container>
    </Box>
  );
}
