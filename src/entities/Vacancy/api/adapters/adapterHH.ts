import { toRightCurrencyCode } from '@shared/lib';
import { combineDutyAndReqToDesc } from './combineDutyAndReqToDesc';
import { Vacancy } from '@entities/Vacancy';
import { VacancyHH } from '../types/VacancyHH';

export const adapterHH = (data: Array<VacancyHH>): Array<Vacancy> => {
  return data.map(vacancy => {
    return {
      id: 'hh-' + vacancy.id,
      profession: vacancy.name,
      firmName: vacancy.employer.name,
      town: vacancy.area.name,
      description: combineDutyAndReqToDesc(vacancy.snippet.responsibility, vacancy.snippet.requirement),
      source: 'hh',
      paymentFrom: vacancy.salary?.from,
      paymentTo: vacancy.salary?.to,
      currency: toRightCurrencyCode(vacancy.salary?.currency ?? 'RUB'),
      link: vacancy.alternate_url,
      datePublished: Date.parse(vacancy.published_at),
      isFavorite: false
    }
  });
}
