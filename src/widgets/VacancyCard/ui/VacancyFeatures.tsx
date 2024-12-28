import { FavoriteIconButton } from '@features/Favorites';
import { CardActions } from '@mui/material';
import { vacancyFeaturesStyle } from './styles';
import { Vacancy } from '@entities/Vacancy';

interface Props {
  data: Vacancy;
}

export const VacancyFeatures: React.FC<Props> = ({ data }) => {
  return (
    <CardActions css={vacancyFeaturesStyle} >
      <FavoriteIconButton data={data} />
    </CardActions>
  );
}
