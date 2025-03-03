import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { adapterTrudvsem } from '../model/adapters/adapterTrudvsem';

export const getVacancyById = async (id: string, signal: AbortSignal): Promise<Vacancy> => {
  const [source, ...rest] = id.split('_');
  
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;

  switch (source) {
    case 'sj': {
      const vacancyId = rest[0];
      const vacancy = await VacancyService.getSuperjobById(vacancyId, signal);
      return adapterSuperjob.adaptVacancy(vacancy);
    }
    case 'hh': {
      const vacancyId = rest[0];
      const vacancy = await VacancyService.getHHById(vacancyId, signal);
      return adapterHH.adaptVacancy(vacancy);
    }
    case 'tv': {
      const [companyId, vacancyId] = rest;
      const vacancy = await VacancyService.getTrudvsemById(companyId, vacancyId, signal);
      return adapterTrudvsem.adaptVacancy(vacancy);
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
