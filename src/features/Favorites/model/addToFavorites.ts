export const addToFavorites = (vacancyId: string) => {
  window.localStorage.setItem('favorites', JSON.stringify(JSON.parse(window.localStorage.getItem('favorites') || '[]').concat(vacancyId)));
}
