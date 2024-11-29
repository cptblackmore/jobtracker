import { Vacancy } from '@entities/VacancyCard';
import type { VacancyTrudvsem } from '@shared/api/';

export const adapterTrudvsem = (data: Array<VacancyTrudvsem>): Array<Vacancy> => {
  return data.map(vacancy => {
    return {
      profession: vacancy.vacancy['job-name'].charAt(0).toUpperCase() + vacancy.vacancy['job-name'].slice(1),
      firmName: vacancy.vacancy.company.name,
      town: vacancy.vacancy.region.name,
      description: `${vacancy.vacancy.duty}\n${vacancy.vacancy.requirement}`, // TODO Make formatter function for deleting HTML tags
      source: 'trudvsem',
      paymentFrom: vacancy.vacancy.salary_min,
      paymentTo: vacancy.vacancy.salary_max,
      currency: 'RUB', // TODO Return vacancy.vacancy.currency after making formatting function
      link: vacancy.vacancy.vac_url,
      datePublished: new Date(vacancy.vacancy['creation-date']).getTime()
    }
  })
}