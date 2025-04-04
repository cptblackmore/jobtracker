import { Box, Button, Container, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { pages } from '@shared/lib';
import { VacancyListDemo } from '@widgets/VacancyList';
import { Link as RouterLink } from 'react-router';
import { SectionTitle } from './SectionTitle';

interface Props {
  sectionStyle: SxProps
}

export const DemoSection: React.FC<Props> = ({ sectionStyle }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box 
      component='section' 
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light, 
        color: (theme) => theme.palette.primary.contrastText,
        ...sectionStyle
      }}
    >
      <Container maxWidth='md' >
        <SectionTitle title='Актуальные вакансии на текущий момент' />
        <VacancyListDemo />
        <Box pt={{xs: 2, md: 4}} display='flex' justifyContent='center' >
          <Button 
            variant='contained'
            size={isSmUp ? 'large' : 'medium'}
            color='secondary'
            component={RouterLink}
            to={pages.search.path}
          >
            Найти больше
          </Button> 
        </Box>
      </Container>
    </Box>
  );
}
