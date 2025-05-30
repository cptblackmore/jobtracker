import { createContext } from "react";
import { FavoritesStore } from "@features/Favorites";
import { authStore } from "@features/Auth";
import { alertsStore } from "@shared/ui";

interface State {
  favoritesStore: FavoritesStore;
}

const favoritesStore = new FavoritesStore(authStore, alertsStore);

export const FavoritesContext = createContext<State>({ favoritesStore });
export { favoritesStore };
