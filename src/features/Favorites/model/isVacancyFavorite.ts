export const isVacancyFavorite = (vacancyId: string) => {
  return Boolean(window.localStorage.getItem('favorites')?.includes(vacancyId));
}
