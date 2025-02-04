import { makeAutoObservable, reaction } from 'mobx';
import { FavoritesService, FavoritesResponse } from '@features/Favorites';
import { createAlert, AlertsStore, AuthStore } from '@shared/model';

export class FavoritesStore {
  isAuth = false;
  isSynced = false;
  isActivated = false;
  private alertsStore: AlertsStore;

  constructor(authStore: AuthStore, alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    
    reaction(
      () => authStore.isAuth,
      (isAuth) => {
        if (isAuth) {
          this.setAuth(true);
          this.setActivated(authStore.isActivated);
          if (!authStore.isActivated) {
            this.alertsStore.addAlert(createAlert('Избранное не сохраняется на вашем аккаунте, так как он не активирован!', 'warning', 3000));
            return;
          }
          const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]');
          this.synchronizeFavorites(favorites);
        } else {
          this.setAuth(false);
          this.setSynced(false);
        }
      }
    )
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setActivated(bool: boolean) {
    this.isActivated = bool;
  }

  setSynced(bool: boolean) {
    this.isSynced = bool;
  }

  async synchronizeFavorites(favorites: FavoritesResponse['favorites']) {
    try {
      if (!this.isAuth) return;
      if (!this.isActivated) {
        this.alertsStore.addAlert(createAlert('Избранное не сохраняется на вашем аккаунте, т.к. он не активирован!', 'warning', 2000));
        return;
      }

      const response = await FavoritesService.synchronizeFavorites(favorites);
      window.localStorage.setItem('favorites', JSON.stringify(response.data.favorites) || '[]');
      this.setSynced(true);
      this.alertsStore.addAlert(createAlert('Избранные вакансии синхронизированы', 'info', 2000));
    } catch (e) {
      console.log(e);
    }
  }

  async updateFavorites(favorites: FavoritesResponse['favorites']) {
    try {
      if (!this.isSynced) return;

      await FavoritesService.updateFavorites(favorites);
    } catch (e) {
      console.log(e);
    }
  }
}
