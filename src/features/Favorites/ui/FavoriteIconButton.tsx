import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Vacancy } from '@entities/Vacancy';
import { ToggleIconButton } from '@shared/ui';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { FavoritesContext } from '../model/FavoritesContext';
import { useMediaQuery, useTheme } from '@mui/material';

interface Props {
  favorite: Vacancy;
}

export const FavoriteIconButton: React.FC<Props> = observer(({ favorite }) => {
  const { favoritesStore } = useContext(FavoritesContext);
  const isFavorite = favoritesStore.isFavorite(favorite.id);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  function handleToggle() {
    if (isFavorite) {
      favoritesStore.deleteFavorites(favorite.id);
    } else {
      favoritesStore.addFavorites(favorite.id);
    }
  }

  return (
    <ToggleIconButton
      isToggled={isFavorite}
      onToggle={handleToggle}
      defaultIcon={<FavoriteBorder />}
      toggledIcon={<Favorite color='secondary' />}
      defaultTooltip='Добавить в избранное'
      toggledTooltip='Удалить из избранного'
      options={{
        size: isSmUp ? 1.2 : 1,
        wrapperSize: isSmUp ? 1.5 : 1.3,
        tooltipEnterDelay: 500,
        tooltipLeaveDelay: 300
      }}
    />
  );
});
