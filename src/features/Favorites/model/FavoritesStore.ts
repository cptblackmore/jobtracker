import { makeAutoObservable, reaction } from 'mobx';
import { FavoritesService, FavoritesResponse } from '@features/Favorites';
import { createAlert, AlertsStore, AuthStore } from '@shared/model';

export class FavoritesStore {
  isAuth = false;
  isSynced = false;
  private alertsStore: AlertsStore;

  constructor(authStore: AuthStore, alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    makeAutoObservable(this);
    
    reaction(
      () => authStore.isAuth,
      async (isAuth) => {
        if (isAuth) {
          this.setAuth(true);
          const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]');
          await this.synchronizeFavorites(favorites);
          this.alertsStore.addAlert(createAlert('Избранные вакансии синхронизированы', 'info'));
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

  setSynced(bool: boolean) {
    this.isSynced = bool;
  }

  async synchronizeFavorites(favorites: FavoritesResponse['favorites']) {
    try {
      if (!this.isAuth) return;

      const response = await FavoritesService.synchronizeFavorites(favorites);
      window.localStorage.setItem('favorites', JSON.stringify(response.data.favorites) || '[]');
      this.setSynced(true);
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
