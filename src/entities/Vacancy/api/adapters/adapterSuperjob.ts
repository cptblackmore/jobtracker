import { Vacancy } from '@entities/Vacancy'
import { VacancySuperjob } from '../types/VacancySuperjob'

export const adapterSuperjob = (data: Array<VacancySuperjob>): Array<Vacancy> => {
  return data.map(vacancy => {
    return {
      id: 'sj-' + vacancy.id.toString(),
      profession: vacancy.profession,
      firmName: vacancy.firm_name,
      town: vacancy.town.title,
      description: vacancy.candidat,
      source: 'superjob',
      paymentFrom: vacancy.payment_from,
      paymentTo: vacancy.payment_to,
      currency: vacancy.currency,
      link: vacancy.link,
      datePublished: vacancy.date_published * 1000,
      isFavorite: false
    }
  });
}
