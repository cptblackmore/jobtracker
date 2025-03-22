export const addFavoritesLS = (favoritesIds: string | string []): string[] => {
  const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]');
  const idsToAdd = Array.isArray(favoritesIds) ? favoritesIds : [favoritesIds];
  const newFavorites = [...new Set([...favorites, ...idsToAdd])];
  if (newFavorites.length !== favorites.length) {
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }
  return newFavorites;
};
