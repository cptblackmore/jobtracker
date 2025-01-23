import { FavoritesContext, favoritesStore } from '@features/Favorites';
import { AuthContext, authStore } from '@shared/model';

interface Props {
  children: React.ReactNode;
}

export const StoresProvider: React.FC<Props> = ({children}) => {
  return (
    <AuthContext.Provider value={{ authStore }} >
      <FavoritesContext.Provider value={{ favoritesStore }} >
        {children}
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  );
};
