import { FavoritesContext, favoritesStore } from '@features/Favorites';
import { AuthContext, authStore } from '@shared/model';
import { AlertsContext, alertsStore } from '@shared/model';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const StoresProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  return (
    <AlertsContext.Provider value={{ alertsStore }} >
      <AuthContext.Provider value={{ authStore }} >
        <FavoritesContext.Provider value={{ favoritesStore }} >
          {children}
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    </AlertsContext.Provider>
  );
};
