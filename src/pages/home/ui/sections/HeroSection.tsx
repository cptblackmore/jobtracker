import { Box, Button, Container, SxProps } from '@mui/material';
import { Typography as T } from '@mui/material';
import { PagesContext } from '@shared/config';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router'
import { CtaTitle } from './CtaTitle';
import { homePageElementsIds } from '@shared/ui';

interface Props {
  sectionStyle: SxProps
}

export const HeroSection: React.FC<Props> = ({ sectionStyle }) => {
  const { pages } = useContext(PagesContext);

  return (
    <Box
      component='section'
      sx={{minHeight: {xs: '80vh', md: '50vh'}, ...sectionStyle}}
      role='region'
      aria-labelledby={homePageElementsIds.heroHeading}
      aria-describedby={homePageElementsIds.heroDescription}
    >
      <Container maxWidth='md' >
        <T 
          id={homePageElementsIds.heroHeading}
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
          id={homePageElementsIds.heroDescription}
          title='Ваш универсальный инструмент для быстрого поиска вакансий с разных источников в один клик'
        />
        <Button 
          component={RouterLink}
          variant='contained' 
          size='large' 
          color='secondary'
          to={pages.search.path}
          aria-label='Перейти на страницу поиска вакансий'
        >
          Найти вакансии
        </Button>
      </Container>
    </Box>
  );
}
