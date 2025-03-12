import { FavoritesContext } from '@features/Favorites';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

export const useFavoritesActions = (ids: string[], setIds: Dispatch<SetStateAction<string[]>>) => {
  const [open, setOpen] = useState(false);
  const { favoritesStore } = useContext(FavoritesContext);

  const handleDeleteFavorites = () => {
    setOpen(false);
    deleteFromFavorites(ids);
    setIds([]);
    favoritesStore.updateFavorites([]);
  }

  return { open, setOpen, handleDeleteFavorites }
}
