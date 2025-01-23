import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Vacancy } from '@entities/Vacancy';
import { ToggleIconButton } from '@shared/ui';
import { useContext, useState } from 'react';
import { isVacancyFavorite } from '../model/isVacancyFavorite';
import { addToFavorites } from '../model/addToFavorites';
import { deleteFromFavorites } from '../model/deleteFromFavorites';
import { observer } from 'mobx-react-lite';
import { FavoritesContext } from '../model/FavoritesContext';

interface Props {
  data: Vacancy;
}

export const FavoriteIconButton: React.FC<Props> = observer(({ data }) => {
  const [isFavorite, setIsFavorite] = useState(isVacancyFavorite(data.id));
  const { favoritesStore } = useContext(FavoritesContext);

  function handleToggle() {
    if (isFavorite) {
      const favorites = deleteFromFavorites(data.id);
      favoritesStore.updateFavorites(favorites);
      setIsFavorite(false);
    } else {
      const favorites = addToFavorites(data.id);
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
