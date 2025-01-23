import { createContext } from 'react';
import { FavoritesStore } from '@features/Favorites';
import { authStore } from '@shared/model';

interface State {
  favoritesStore: FavoritesStore;
}

const favoritesStore = new FavoritesStore(authStore);

export const FavoritesContext = createContext<State>({ favoritesStore });
export { favoritesStore };
