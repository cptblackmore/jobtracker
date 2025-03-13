import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useFavoritesList } from '../model/useFavoritesList';
import { chunkerize } from '@shared/lib';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  ids: string[];
}

export const FavoritesList: React.FC<Props> = ({ ids }) => {
  const { vacancies, isLoading, page, setPage } = useFavoritesList(ids);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && page < chunkerize(ids, 5).length - 1) setPage(page + 1);
  }, [inView]);

  return (
    <Box>
      <Stack direction="column" alignItems="center" spacing={1} css={vacancyListStyle}>
        {vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isLoading ? (
          <CircularProgress size="5em" />
        ) : (
          <Box ref={ref} ></Box>
        )}
      </Stack>
    </Box>
  );
};
