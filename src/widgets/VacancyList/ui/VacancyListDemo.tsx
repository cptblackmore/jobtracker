import { VacancyCard } from '@widgets/VacancyCard';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useVacancyList } from '../model/useVacancyList';
import { VacancyParams } from '@entities/Vacancy';
import { Link as RouterLink } from 'react-router';

interface Props {
  initialFilters?: VacancyParams['filters'];
}

export const VacancyListDemo: React.FC<Props> = ({ initialFilters={} }) => {
  const { state, isLoading } = useVacancyList({page: 0, count: 1, filters: initialFilters});

  return (
    <Box>
      <Stack direction='column' alignItems='center' spacing={1} css={vacancyListStyle} >
        {state.vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isLoading && (
          <CircularProgress size='5em' />
        )}
        <Box paddingTop={1} >
          <Button 
            variant='contained'
            component={RouterLink}
            to={'/feed'}
          >
            Найти больше
          </Button> 
        </Box>
      </Stack>
    </Box>
  );
}
