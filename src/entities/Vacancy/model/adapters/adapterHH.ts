import { toRightCurrencyCode } from '@shared/lib';
import { combineDutyAndReqToDesc } from './combineDutyAndReqToDesc';
import { parseFormattedPlace, Vacancy, VacancyParams, VacancyType } from '@entities/Vacancy';
import { VacancyHH, VacancyHHById } from '../../api/types/VacancyHH';
import { HHParams } from '../../api/types/Params';
import { convert } from 'html-to-text';
import { Adapter } from './Adapter';

export const adapterHH: Adapter<'hh'> = {
  adaptParams(params: VacancyParams): HHParams {
    const typeMap: Record<VacancyType, HHParams['schedule']> = {
      full: 'fullDay',
      shift: 'shift',
      fifo: 'flyInFlyOut'
    };
    const parsedPlace = parseFormattedPlace(params.filters?.place);

    return {
      page: params.page,
      per_page: params.count,
      text: params.filters?.text ?? '',
      salary: Math.floor((((params.filters.salary?.from ?? 0) + (params.filters.salary?.to ?? 0)) / 2)) || null,
      only_with_salary: (params.filters?.salary?.from || params.filters?.salary?.to) ? true : false,
      period: (params.filters?.period === 0 ? 99 : params.filters?.period) ?? 99,
      schedule: params.filters?.type ? typeMap[params.filters?.type] : null,
      area: params.filters?.place ? `place~${parsedPlace.id ? `id~~${parsedPlace.id}` : `name~~${parsedPlace.name}`}` : null
    }
  },

  adaptVacancies(vacancies: Array<VacancyHH>): Array<Vacancy> { 
    return vacancies.map(vacancy => {
      return {
        id: 'hh_' + vacancy.id,
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
  },

  adaptVacancy(vacancy: VacancyHHById): Vacancy {
    return {
      id: 'hh_' + vacancy.id,
      profession: vacancy.name,
      firmName: vacancy.employer.name,
      town: vacancy.area.name,
      description: convert(vacancy.description),
      source: 'hh',
      paymentFrom: vacancy.salary?.from,
      paymentTo: vacancy.salary?.to,
      currency: toRightCurrencyCode(vacancy.salary?.currency ?? 'RUB'),
      link: vacancy.alternate_url,
      datePublished: Date.parse(vacancy.published_at),
      isFavorite: false
    }
  }
}
