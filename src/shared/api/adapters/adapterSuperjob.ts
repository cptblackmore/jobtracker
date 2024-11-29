import { Vacancy } from '@entities/VacancyCard';
import type { VacancySuperjob } from '@shared/api/';

export const adapterSuperjob = (data: Array<VacancySuperjob>): Array<Vacancy> => {
  return data.map(vacancy => {
    return {
      profession: vacancy.profession,
      firmName: vacancy.firm_name,
      town: vacancy.town.title,
      description: vacancy.candidat,
      source: 'superjob',
      paymentFrom: vacancy.payment_from,
      paymentTo: vacancy.payment_to,
      currency: vacancy.currency,
      link: vacancy.link,
      datePublished: vacancy.date_published * 1000
    }
  })
}