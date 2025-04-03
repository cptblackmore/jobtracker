import { Box, Button, Container, SxProps } from '@mui/material';
import { Typography as T } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router'
import { CtaTitle } from './CtaTitle';

interface Props {
  sectionStyle: SxProps
}

export const HeroSection: React.FC<Props> = ({ sectionStyle }) => {
  const { pages } = useContext(PagesContext);

  return (
    <Box
      component='section'
      sx={{minHeight: {xs: '80vh', md: '50vh'}, ...sectionStyle}}
    >
      <Container maxWidth='md' >
        <T 
          component='h1' 
          variant='h1' 
          sx={(theme) => ({
            fontSize: {
              xs: '2.4rem',
              sm: {fontSize: theme.typography.h1.fontSize}
            },
            mb: {
              xs: 3,
              sm: 2
            }
          })}
        >
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
