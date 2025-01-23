export const addToFavorites = (vacancyId: string): string[] => {
  const favorites = JSON.parse(window.localStorage.getItem('favorites') || '[]');
  if (!favorites.includes(vacancyId)) {
    favorites.push(vacancyId);
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  return favorites;
};
