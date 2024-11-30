import { Vacancy } from '@entities/VacancyCard';
import { combineDutyAndReqToDesc, type VacancyTrudvsem } from '@shared/api/';
import { toUpperCaseFirstLetter } from '@shared/lib';
import { convert } from 'html-to-text';

export const adapterTrudvsem = (data: Array<VacancyTrudvsem>): Array<Vacancy> => {
  return data.map(item => {
    const vacancy = item.vacancy;
    const descriptionDuty = toUpperCaseFirstLetter(convert(vacancy.duty));
    const descriptionReq = toUpperCaseFirstLetter(convert(vacancy.requirement.qualification ?? ''));
    const description = combineDutyAndReqToDesc(descriptionDuty, descriptionReq);
    
    return {
      id: 'tv-' + vacancy.id,
      profession: toUpperCaseFirstLetter(vacancy['job-name']),
      firmName: vacancy.company.name,
      town: vacancy.region.name,
      description: description,
      source: 'trudvsem',
      paymentFrom: vacancy.salary_min,
      paymentTo: vacancy.salary_max,
      currency: 'RUB', // TODO Return vacancy.vacancy.currency after making formatting function
      link: vacancy.vac_url,
      datePublished: new Date(vacancy['creation-date']).getTime()
    }
  })
}