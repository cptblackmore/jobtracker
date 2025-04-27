import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyService } from '../api/VacancyService';
import { SourceId } from '../model/Sources';
import { AxiosError } from 'axios';
import { createVacancyNotFoundError } from '../api/createVacancyNotFoundError';

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
        if (e instanceof AxiosError) {
          if (e.status === 404) {
            throw createVacancyNotFoundError(e, id);
          }
          if (e.status === 403) {
            throw new AxiosError(e.message, 'FAVORITES_NOT_AVAILABLE');
          }
          throw e;
        } else {
          throw e;
        }
      }
    }
    case 'tv': {
      const [companyId, vacancyId] = id.split('_');
      try {
        const response = await VacancyService.getTrudvsemById(companyId, vacancyId, signal);
        if (!response.data.results.vacancies) {
          throw createVacancyNotFoundError(response, id);
        }
        return adapterTrudvsem.adaptVacancy(response.data.results.vacancies[0].vacancy);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status === 502) {
            throw new AxiosError(e.message, 'SOURCE_UNAVAILABLE');
          }
          throw e;
        } else {
          throw e;
        }
      }
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
