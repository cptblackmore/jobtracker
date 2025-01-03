import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useFavoritesList } from '../model/useFavoritesList';

interface Props {
  ids: string[];
}

export const FavoritesList: React.FC<Props> = ({ ids }) => {
  const { vacancies, isLoading } = useFavoritesList(ids);

  return (
    <Box>
      <Stack direction="column" alignItems="center" spacing={1} css={vacancyListStyle}>
        {vacancies.map((data) => (
          <VacancyCard key={data.id} data={data} />
        ))}
        {isLoading && (
          <CircularProgress size="5em" />
        )}
      </Stack>
    </Box>
  );
};
