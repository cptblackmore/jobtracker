import { VacancyFilters } from "../types/VacancyFilters"

export const paramsAdapter = (target: string, page: number, count: number, filters?: VacancyFilters) => {
  switch (target) {
    case 'superjob':
      return {
        page,
        count: count,
        keyword: filters?.text ?? '',
        payment_from: filters?.salary?.from ?? null,
        payment_to: filters?.salary?.to ?? null,
        no_agreement: filters?.salary ? 1 : 0,
        period: filters?.period ?? 1
      }
    case 'hh':
      return {
        page,
        count: count,
        text: filters?.text ?? '',
        salary: filters?.salary ? (filters.salary.from + filters.salary.to) / 2 : null,
        period: filters?.period ?? 1
      }
    case 'trudvsem':
      return {
        offset: page,
        limit: count,
        text: filters?.text ?? ''
      }
  }
}
