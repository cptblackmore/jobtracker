export const deleteFromFavoritesLS = (vacancyIds: string | string[]): string[] => {
  const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]').filter((id: string) => !vacancyIds.includes(id));
  window.localStorage.setItem('favorites', JSON.stringify(favorites));
  return favorites;
};
