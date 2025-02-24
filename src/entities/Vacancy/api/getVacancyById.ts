import { servicesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyRequestService } from './VacancyRequestService';
import { adapterTrudvsem } from '../model/adapters/adapterTrudvsem';

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const [service, ...rest] = id.split('_');
  
  const adapterSuperjob = servicesRegistry.superjob.adapter;
  const adapterHH = servicesRegistry.hh.adapter;

  switch (service) {
    case 'sj': {
      const vacancyId = rest[0];
      const vacancy = await VacancyRequestService.getSuperjobById(vacancyId);
      return adapterSuperjob.adaptVacancy(vacancy);
    }
    case 'hh': {
      const vacancyId = rest[0];
      const vacancy = await VacancyRequestService.getHHById(vacancyId);
      return adapterHH.adaptVacancy(vacancy);
    }
    case 'tv': {
      const [companyId, vacancyId] = rest;
      const vacancy = await VacancyRequestService.getTrudvsemById(companyId, vacancyId);
      return adapterTrudvsem.adaptVacancy(vacancy);
    }
    default: {
      throw new Error(`Неизвестный сервис: ${service}`);
    }
  }
};
