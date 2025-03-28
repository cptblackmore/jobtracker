import { Box, Button, Container } from '@mui/material';
import { pages } from '@shared/lib';
import { VacancyListDemo } from '@widgets/VacancyList';
import { Link as RouterLink } from 'react-router';
import { SectionTitle } from './SectionTitle';

export const DemoSection: React.FC = () => {
  return (
    <Box 
      component='section'  
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light, 
        color: (theme) => theme.palette.primary.contrastText
      }}
    >
      <Container maxWidth='md' >
        <Box py={8} >
          <SectionTitle title='Актуальные вакансии на текущий момент' />
          <VacancyListDemo />
          <Box pt={4} display='flex' justifyContent='center' >
            <Button 
              variant='contained'
              size='large'
              color='secondary'
              component={RouterLink}
              to={pages.search.path}
            >
              Найти больше
            </Button> 
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
