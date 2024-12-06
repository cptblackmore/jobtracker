import { AddToFavorites } from '@features/AddToFavorites';
import { CardActions } from '@mui/material';
import { vacancyFeaturesStyle } from './styles';
import { Vacancy } from '@entities/Vacancy';

interface Props {
  data: Vacancy;
}

export const VacancyFeatures: React.FC<Props> = ({ data }) => {
  return (
    <CardActions css={vacancyFeaturesStyle} >
      <AddToFavorites data={data} />
    </CardActions>
  );
}
