import { FavoriteIconButton } from '@features/Favorites';
import { CardActions } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';

interface Props {
  vacancy: Vacancy;
}

export const VacancyFeatures: React.FC<Props> = ({ vacancy }) => {
  return (
    <CardActions sx={{alignItems: 'start', pt: 2}} >
      <FavoriteIconButton favorite={vacancy} />
    </CardActions>
  );
}
