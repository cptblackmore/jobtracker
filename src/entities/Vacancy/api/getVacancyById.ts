import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { SourceId } from '../model/Sources';
import { AxiosError } from 'axios';
import { createVacancyNotFoundError } from './createVacancyNotFoundError';

export const getVacancyById = async (id: string, source: SourceId, signal: AbortSignal): Promise<Vacancy> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;
  const adapterTrudvsem = sourcesRegistry.trudvsem.adapter;

  switch (source) {
    case 'sj': {
      try {
        const response = await VacancyService.getSuperjobById(id, signal);
        return adapterSuperjob.adaptVacancy(response.data);
        
      } catch (e) {
        if (e instanceof AxiosError && e.status === 404) {
          throw createVacancyNotFoundError(e, id);
        } else {
          throw e;
        }
      }
    }
    case 'hh': {
      try {
        const response = await VacancyService.getHHById(id, signal);
        return adapterHH.adaptVacancy(response.data);
      } catch (e) {
        if (e instanceof AxiosError && e.status === 404) {
          throw createVacancyNotFoundError(e, id);
        } else {
          throw e;
        }
      }
    }
    case 'tv': {
      const [companyId, vacancyId] = id.split('_');
      const response = await VacancyService.getTrudvsemById(companyId, vacancyId, signal);
      if (!response.data.results.vacancies) {
        throw createVacancyNotFoundError(response, id);
      }
      return adapterTrudvsem.adaptVacancy(response.data.results.vacancies[0].vacancy);
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
