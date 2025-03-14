import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Vacancy } from '@entities/Vacancy';
import { ToggleIconButton } from '@shared/ui';
import { useContext, useState } from 'react';
import { isVacancyFavoriteLS } from '../model/isVacancyFavoriteLS';
import { addToFavoritesLS } from '../model/addToFavoritesLS';
import { deleteFromFavoritesLS } from '../model/deleteFromFavoritesLS';
import { observer } from 'mobx-react-lite';
import { FavoritesContext } from '../model/FavoritesContext';

interface Props {
  data: Vacancy;
}

export const FavoriteIconButton: React.FC<Props> = observer(({ data }) => {
  const [isFavorite, setIsFavorite] = useState(isVacancyFavoriteLS(data.id));
  const { favoritesStore } = useContext(FavoritesContext);

  function handleToggle() {
    if (isFavorite) {
      const favorites = deleteFromFavoritesLS(data.id);
      favoritesStore.updateFavorites(favorites);
      setIsFavorite(false);
    } else {
      const favorites = addToFavoritesLS(data.id);
      favoritesStore.updateFavorites(favorites);
      setIsFavorite(true);
    }
  }

  return (
    <ToggleIconButton
      isToggled={isFavorite}
      onToggle={handleToggle}
      defaultIcon={<FavoriteBorder />}
      toggledIcon={<Favorite color='primary' />}
      defaultTooltip='Добавить в избранное'
      toggledTooltip='Удалить из избранного'
    />
  );
});
