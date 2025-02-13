import { FavoritesContext, favoritesStore } from '@features/Favorites';
import { AuthContext, authStore } from '@shared/model';
import { AlertsContext, alertsStore } from '@shared/model';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const StoresProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const repeatCooldown = 5000;
    const getRefreshTime = () => localStorage.getItem('refreshTime');
    const removeRefreshTime = () => localStorage.removeItem('refreshTime');
    const getCurrentTimeUntilRepeat = () => Date.now() - Number(getRefreshTime());
    const checkAuth = () => authStore.checkAuth();
    if (getRefreshTime()) {
      if (getCurrentTimeUntilRepeat() > repeatCooldown) {
        removeRefreshTime();
        checkAuth();
      } else {
        setTimeout(() => {
          if (!getRefreshTime()) {
            checkAuth();
          } else if (getCurrentTimeUntilRepeat() < repeatCooldown) {
            checkAuth();
          } else {
            removeRefreshTime();
            checkAuth();
          }
        }, repeatCooldown - getCurrentTimeUntilRepeat())
      }
    } else {
      checkAuth();
    }
  }, [])

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
