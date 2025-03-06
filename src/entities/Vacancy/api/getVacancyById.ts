import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { SourceId } from '../model/Sources';

export const getVacancyById = async (id: string, source: SourceId, signal: AbortSignal): Promise<Vacancy> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;
  const adapterTrudvsem = sourcesRegistry.trudvsem.adapter;

  switch (source) {
    case 'sj': {
      const vacancy = await VacancyService.getSuperjobById(id, signal);
      return adapterSuperjob.adaptVacancy(vacancy);
    }
    case 'hh': {
      const vacancy = await VacancyService.getHHById(id, signal);
      return adapterHH.adaptVacancy(vacancy);
    }
    case 'tv': {
      const [companyId, vacancyId] = id.split('_');
      const vacancy = await VacancyService.getTrudvsemById(companyId, vacancyId, signal);
      return adapterTrudvsem.adaptVacancy(vacancy);
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
