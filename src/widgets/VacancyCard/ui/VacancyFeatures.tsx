import { FavoriteIconButton } from '@features/Favorites';
import { CardActions } from '@mui/material';
import { vacancyFeaturesStyle } from './styles';
import { Vacancy } from '@entities/Vacancy';

interface Props {
  vacancy: Vacancy;
}

export const VacancyFeatures: React.FC<Props> = ({ vacancy }) => {
  return (
    <CardActions css={vacancyFeaturesStyle} >
      <FavoriteIconButton favorite={vacancy} />
    </CardActions>
  );
}
