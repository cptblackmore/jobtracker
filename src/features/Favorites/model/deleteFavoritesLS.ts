export const deleteFavoritesLS = (favoritesIds: string | string[]): string[] => {
  const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]').filter((id: string) => !favoritesIds.includes(id));
  window.localStorage.setItem('favorites', JSON.stringify(favorites));
  return favorites;
};
