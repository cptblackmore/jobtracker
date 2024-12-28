export const deleteFromFavorites = (vacancyId: string) => {
  window.localStorage.setItem('favorites', JSON.stringify(JSON.parse(window.localStorage.getItem('favorites') || '[]').filter((id: string) => id !== vacancyId)));
}
