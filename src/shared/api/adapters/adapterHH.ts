import { Vacancy } from '@entities/VacancyCard';
import { combineDutyAndReqToDesc, type VacancyHH } from '@shared/api';

export const adapterHH = (data: Array<VacancyHH>): Array<Vacancy> => {
  return data.map(vacancy => {
    return {
      id: 'hh-' + vacancy.id,
      profession: vacancy.name,
      firmName: vacancy.employer.name,
      town: vacancy.area.name,
      description: combineDutyAndReqToDesc(vacancy.snippet.responsibility, vacancy.snippet.requirement),
      source: 'hh',
      paymentFrom: vacancy.salary?.from ?? 0,
      paymentTo: vacancy.salary?.to ?? 0,
      currency: vacancy.salary?.currency ?? 'rub', // TODO Return just vacancy.salary.currency after making formatter function
      link: vacancy.alternate_url,
      datePublished: Date.parse(vacancy.published_at)
    }
  })
}