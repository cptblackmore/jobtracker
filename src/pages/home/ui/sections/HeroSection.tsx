import { Box, Button, Container } from '@mui/material';
import { Typography as T } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router'

export const HeroSection: React.FC = () => {
  const pages = useContext(PagesContext);

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
        <T component='h1' variant='h3' gutterBottom >
          Добро пожаловать в JobTracker
        </T>
        <T component='h2' variant='h5' mb={3} >
          Ваш универсальный инструмент для быстрого поиска вакансий
          с разных источников в один клик
        </T>
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
