import { FavoriteIconButton } from '@features/Favorites';
import { CardActions } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';

interface Props {
  vacancy: Vacancy;
}

export const VacancyFeatures: React.FC<Props> = ({ vacancy }) => {
  return (
    <CardActions 
      sx={{
        alignItems: 'start', 
        pt: {xs: 1.5, sm: 2}
      }}
    >
      <FavoriteIconButton 
        favorite={vacancy} 
        ariaLabelOnFavorite={`Удаление из избранного ${vacancy.profession}`} 
        ariaLabelOnNotFavorite={`Добавление в избранное ${vacancy.profession}`}
      />
    </CardActions>
  );
}
