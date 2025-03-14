export const isVacancyFavoriteLS = (vacancyId: string) => {
  return Boolean(window.localStorage.getItem('favorites')?.includes(vacancyId));
}
