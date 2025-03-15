import { makeAutoObservable, reaction } from 'mobx';
import { FavoritesService, FavoritesResponse, getFavoritesLS } from '@features/Favorites';
import { createAlert, AlertsStore, AuthStore } from '@shared/model';

export class FavoritesStore {
  favorites: string[] = JSON.parse(window.localStorage.getItem('favorites') || '[]');
  isSynced = false;
  favoritesQuantity = 0;
  private alertsStore: AlertsStore;
  private authStore: AuthStore;

  constructor(authStore: AuthStore, alertsStore: AlertsStore) {
    this.alertsStore = alertsStore;
    this.authStore = authStore;
    makeAutoObservable(this);
    
    reaction(
      () => ({isAuth: authStore.isAuth, isActivated: authStore.user?.isActivated}),
      ({ isAuth, isActivated }) => {
        if (isAuth) {
          if (!isActivated) {
            this.setFavoritesQuantity(0);
            this.alertsStore.addAlert(
              createAlert(
                'Избранное не сохраняется на вашем аккаунте, так как он не активирован!', 'warning', 3000, 'activation-required'
              )
            );
            return;
          }
          const favorites = getFavoritesLS();
          this.synchronizeFavorites(favorites);
        } else {
          this.setSynced(false);
        }
      },
      {
        equals: (prev, next) =>
          prev.isAuth === next.isAuth &&
          prev.isActivated === next.isActivated
      }
    )
  }

  get isAuth() {
    return !!this.authStore.isAuth;
  }

  get isActivated() {
    return !!this.authStore.user?.isActivated;
  }

  setFavorites(favorites: string[]) {
    this.favorites = favorites;
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
        this.alertsStore.addAlert(
          createAlert(
            'Избранное не сохраняется на вашем аккаунте, т.к. он не активирован!', 'warning', 2000, 'activation-required'
          )
        );
        return;
      }

      const response = await FavoritesService.synchronizeFavorites(favorites);
      window.localStorage.setItem('favorites', JSON.stringify(response.data.favorites) || '[]');
      this.setFavorites(response.data.favorites || []);
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
      this.setFavorites(favorites || []);
      this.setFavoritesQuantity(favorites.length);
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    }
  }
}
