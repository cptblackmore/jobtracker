import { VacancyCard } from '@widgets/VacancyCard';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyParams } from '@entities/Vacancy';
import { Link as RouterLink } from 'react-router';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyListDemo: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, isLoading } = useVacancyList({page: 0, count: 1, filters: initialFilters});

  return (
    <>
      <Box sx={{p: 1, backgroundColor: (theme) => theme.palette.background.default, borderRadius: 1}} >
        <Stack direction='column' alignItems='center' spacing={1} >
          {state.vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
          {isLoading && (
            <CircularProgress size='5em' />
          )}
        </Stack>
      </Box>
      <Box pt={3} display='flex' justifyContent={'center'} >
        <Button 
          variant='contained'
          component={RouterLink}
          to={'/feed'}
        >
          Найти больше
        </Button> 
      </Box>
    </>
  );
}
