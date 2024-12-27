import { Vacancy, VacancyParams } from '@entities/Vacancy'
import { VacancySuperjob } from '../../api/types/VacancySuperjob'
import { SuperjobParams } from '../../api/types/Params';

export const adapterSuperjob = {
  adaptParams(params: VacancyParams): SuperjobParams {
    return {
      page: params.page,
      count: params.count,
      keyword: params.filters?.text ?? '',
      payment_from: params.filters?.salary?.from ?? null,
      payment_to: params.filters?.salary?.to ?? null,
      no_agreement: (params.filters?.salary?.from || params.filters?.salary?.to) ? 1 : 0,
      period: params.filters?.period ?? 1
    }
  },
  adaptVacancies(data: Array<VacancySuperjob>): Array<Vacancy> {
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
}
