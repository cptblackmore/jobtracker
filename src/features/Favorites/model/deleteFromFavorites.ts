export const deleteFromFavorites = (vacancyId: string): string[] => {
  const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]').filter((id: string) => id !== vacancyId);
  window.localStorage.setItem('favorites', JSON.stringify(favorites));
  return favorites;
};
