import { toRightCurrencyCode } from '@shared/lib';
import { combineDutyAndReqToDesc } from './combineDutyAndReqToDesc';
import { Vacancy, VacancyParams } from '@entities/Vacancy';
import { VacancyHH } from '../../api/types/VacancyHH';
import { HHParams } from '../../api/types/Params';

export const adapterHH = {
  adaptParams(params: VacancyParams): HHParams {
    return {
      page: params.page,
      per_page: params.count,
      text: params.filters?.text ?? '',
      salary: params.filters?.salary ? (params.filters.salary.from + params.filters.salary.to) / 2 : null,
      period: params.filters?.period ?? 1
    }
  },
  adaptVacancies(data: Array<VacancyHH>): Array<Vacancy> { 
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
}