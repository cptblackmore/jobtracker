export const setFavoritesLS = (favoritesIds: string[]) => {
  window.localStorage.setItem("favorites", JSON.stringify(favoritesIds));
};
