import { toUpperCaseFirstLetter, toRightCurrencyCode } from '@shared/lib';
import { convert } from 'html-to-text';
import { combineDutyAndReqToDesc } from './combineDutyAndReqToDesc';
import { Vacancy, VacancyParams } from '@entities/Vacancy';
import { VacancyTrudvsem, VacancyTrudvsemResponse } from '../../api/types/VacancyTrudvsem';
import { TrudvsemParams } from '../../api/types/Params';
import { Adapter } from './Adapter';

export const adapterTrudvsem: Adapter<'trudvsem'> = {
  adaptParams(params: VacancyParams): TrudvsemParams {
    return {
      offset: params.page,
      limit: params.count,
      text: params.filters?.text ?? ''
    }
  },

  adaptVacancies(data: Array<VacancyTrudvsemResponse>): Array<Vacancy> {
    return data.map(item => {
      const vacancy = item.vacancy;
      const descriptionDuty = toUpperCaseFirstLetter(convert(vacancy.duty));
      const descriptionReq = toUpperCaseFirstLetter(convert(vacancy.requirement.qualification ?? ''));
      const description = combineDutyAndReqToDesc(descriptionDuty, descriptionReq);
      
      return {
        id: 'tv_' + vacancy.company.companycode + '_' + vacancy.id,
        profession: toUpperCaseFirstLetter(vacancy['job-name']),
        firmName: vacancy.company.name,
        town: vacancy.region.name,
        description: description,
        source: 'trudvsem',
        paymentFrom: vacancy.salary_min,
        paymentTo: vacancy.salary_max,
        currency: toRightCurrencyCode(vacancy.currency),
        link: vacancy.vac_url,
        datePublished: new Date(vacancy['creation-date']).getTime(),
        isFavorite: false
      }
    });
  },
  
  adaptVacancy(vacancy: VacancyTrudvsem): Vacancy {
    
    const descriptionDuty = toUpperCaseFirstLetter(convert(vacancy.duty));
    const descriptionReq = toUpperCaseFirstLetter(convert(vacancy.requirement.qualification ?? ''));
    const description = combineDutyAndReqToDesc(descriptionDuty, descriptionReq);
    
    return {
      id: 'tv_' + vacancy.company.companycode + '_' + vacancy.id,
      profession: toUpperCaseFirstLetter(vacancy['job-name']),
      firmName: vacancy.company.name,
      town: vacancy.region.name,
      description: description,
      source: 'trudvsem',
      paymentFrom: vacancy.salary_min,
      paymentTo: vacancy.salary_max,
      currency: toRightCurrencyCode(vacancy.currency),
      link: vacancy.vac_url,
      datePublished: new Date(vacancy['creation-date']).getTime(),
      isFavorite: false
    }
  }
}
