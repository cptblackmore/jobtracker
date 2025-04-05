import { makeAutoObservable, reaction } from 'mobx';
import { FavoritesService, FavoritesResponse, getFavoritesLS, deleteFavoritesLS, addFavoritesLS, setFavoritesLS } from '@features/Favorites';
import { createAlert, AlertsStore, AuthStore } from '@shared/model';

export class FavoritesStore {
  ids: string[] = JSON.parse(window.localStorage.getItem('favorites') || '[]');
  isSynced = false;
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

  setIds(favoritesIds: string[]) {
    this.ids = favoritesIds;
  }

  setSynced(bool: boolean) {
    this.isSynced = bool;
  }

  isFavorite(id: string) {
    return this.ids.includes(id);
  }

  deleteFavorites(favoritesIds: string | string[]) {
    const newIds = deleteFavoritesLS(favoritesIds) ?? [];
    this.setIds(newIds);
    if (this.isSynced) this.updateFavorites(newIds);
  }

  addFavorites(favoritesIds: string | string[]) {
    const newIds = addFavoritesLS(favoritesIds) ?? [];
    this.setIds(newIds);
    if (this.isSynced) this.updateFavorites(newIds);
  }

  clearFavorites() {
    this.setIds([]);
    setFavoritesLS([]);
    if (this.isSynced) this.updateFavorites([]); 
  }

  async synchronizeFavorites(favorites: FavoritesResponse['favorites']) {
    if (!this.isAuth) return;
    if (!this.isActivated) {
      this.alertsStore.addAlert(
        createAlert(
          'Избранное не сохраняется на вашем аккаунте, т.к. он не активирован!', 'warning', 2000, 'activation-required'
        )
      );
      return;
    }
    try {
      const response = await FavoritesService.synchronizeFavorites(favorites);
      setFavoritesLS(response.data.favorites || []);
      this.setIds(response.data.favorites || []);
      this.setSynced(true);
      this.alertsStore.addAlert(createAlert('Избранные вакансии синхронизированы', 'success', 2000));
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }    
    }
  }

  async updateFavorites(favorites: FavoritesResponse['favorites']) {
    if (!this.isSynced) return;
    try {
      await FavoritesService.updateFavorites(favorites);
    } catch (e) {
      if (e instanceof Error) {
        this.alertsStore.addAlert(createAlert(e.message, 'error'));
      }
    }
  }
}
