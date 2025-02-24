import { VacancyCard } from '@widgets/VacancyCard';
import { Box, CircularProgress, Stack } from '@mui/material';
import { vacancyListStyle } from './styles';
import { useFavoritesList } from '../model/useFavoritesList';
import { AlertsContext } from '@shared/model';
import { useContext } from 'react';

interface Props {
  ids: string[];
}

export const FavoritesList: React.FC<Props> = ({ ids }) => {
  const { alertsStore } = useContext(AlertsContext);
  const { vacancies, isLoading } = useFavoritesList(ids, alertsStore);

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
