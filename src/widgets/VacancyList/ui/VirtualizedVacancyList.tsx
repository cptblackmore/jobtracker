import { Virtuoso } from 'react-virtuoso';
import { Vacancy } from '../../../entities/Vacancy/model/Vacancy';
import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  vacancies: Vacancy[];
  isLoading: boolean;
  toNextPage: () => void;
}

export const VirtualizedVacancyList: React.FC<Props> = ({ vacancies, isLoading, toNextPage }) => {
  return (
    <Virtuoso 
      useWindowScroll
      increaseViewportBy={1200}
      data={vacancies}
      itemContent={(_, vacancy) => (
        <div style={{paddingBottom: '0.5em'}} >
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        </div>
      )}
      endReached={() => toNextPage()}
      components={{
        Footer: () => (
          isLoading ? (
            <Box display='flex' justifyContent='center' >
              <CircularProgress size='5em' />
            </Box>
          ) : null
        )
      }}
    />
  );
}
