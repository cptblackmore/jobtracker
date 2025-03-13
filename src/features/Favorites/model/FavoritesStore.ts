import { makeAutoObservable, reaction } from 'mobx';
import { FavoritesService, FavoritesResponse, getFavorites } from '@features/Favorites';
import { createAlert, AlertsStore, AuthStore } from '@shared/model';

export class FavoritesStore {
  isSynced = false;
  favoritesQuantity = 0;
  private alertsStore: AlertsStore;
  private authStore: AuthStore;

  constructor(authStore: AuthStore, alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    this.authStore = authStore;
    makeAutoObservable(this);
    
    reaction(
      () => authStore.isAuth,
      (isAuth) => {
        if (isAuth) {
          if (!this.isActivated) {
            this.setFavoritesQuantity(0);
            this.alertsStore.addAlert(createAlert('Избранное не сохраняется на вашем аккаунте, так как он не активирован!', 'warning', 3000));
            return;
          }
          const favorites = getFavorites();
          this.synchronizeFavorites(favorites);
        } else {
          this.setSynced(false);
        }
      }
    )
  }

  get isAuth() {
    return !!this.authStore.isAuth;
  }

  get isActivated() {
    return !!this.authStore.user?.isActivated;
  }

  setSynced(bool: boolean) {
    this.isSynced = bool;
  }

  setFavoritesQuantity(num: number) {
    this.favoritesQuantity = num;
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
      this.setFavoritesQuantity(response.data.favorites.length);
      this.alertsStore.addAlert(createAlert('Избранные вакансии синхронизированы', 'info', 2000));
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }    
    }
  }

  async updateFavorites(favorites: FavoritesResponse['favorites']) {
    try {
      if (!this.isSynced) return;

      await FavoritesService.updateFavorites(favorites);
      this.setFavoritesQuantity(favorites.length);
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    }
  }
}
