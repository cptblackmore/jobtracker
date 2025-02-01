import { createContext } from 'react';
import { FavoritesStore } from '@features/Favorites';
import { alertsStore, authStore } from '@shared/model';

interface State {
  favoritesStore: FavoritesStore;
}

const favoritesStore = new FavoritesStore(authStore, alertsStore);

export const FavoritesContext = createContext<State>({ favoritesStore });
export { favoritesStore };
