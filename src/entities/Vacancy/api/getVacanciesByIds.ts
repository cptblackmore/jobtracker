import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { SourceId } from '../model/Sources';

export const getVacanciesByIds = async (ids: string[], source: SourceId, signal: AbortSignal): Promise<Vacancy[]> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;

  switch (source) {
    case 'sj': {
      const vacancies = await VacancyService.getSuperjobByIds(ids, signal);
      return adapterSuperjob.adaptVacancies(vacancies);
    }
    case 'hh': {
      throw new Error(`${source} не поддерживает множественное получение вакансий`);
    }
    case 'tv': {
      throw new Error(`${source} не поддерживает множественное получение вакансий`);
    }
    default: {
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
};
