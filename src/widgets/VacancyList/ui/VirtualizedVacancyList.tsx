import { Virtuoso } from 'react-virtuoso';
import { Vacancy } from '../../../entities/Vacancy/model/Vacancy';
import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress } from '@mui/material';

interface Props {
  vacancies: Vacancy[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const VirtualizedVacancyList: React.FC<Props> = ({ vacancies, isLoading, page, setPage }) => {
  return (
    <Virtuoso 
      useWindowScroll
      increaseViewportBy={1200}
      data={vacancies}
      itemContent={(_, vacancy) => (
        <div style={{paddingBottom: '1em'}} >
          <VacancyCard key={vacancy.id} data={vacancy} />
        </div>
      )}
      endReached={() => {
        if (!isLoading) setPage(page + 1);
      }}
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
