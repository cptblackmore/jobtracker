import { Sources, Vacancy, VacancyParams, sourcesRegistry } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';

export const getVacancies = async (params: VacancyParams, source: Sources, signal: AbortSignal): Promise<Vacancy[]> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;
  const adapterTrudvsem = sourcesRegistry.trudvsem.adapter;

  switch (source) {
    case 'superjob':{
      const response = await VacancyService.getSuperjob(adapterSuperjob.adaptParams(params), signal);
      return adapterSuperjob.adaptVacancies(response.data.objects);
    }
    case 'hh':{
      const response = await VacancyService.getHH(adapterHH.adaptParams(params), signal);
      return adapterHH.adaptVacancies(response.data.items);
    }
    case 'trudvsem':{
      const response = await VacancyService.getTrudvsem(adapterTrudvsem.adaptParams(params), signal);
      const vacancies = response.data.results.vacancies.map(vacancyContainer => vacancyContainer.vacancy);
      return adapterTrudvsem.adaptVacancies(vacancies);
    }
    default:{
      throw new Error(`Неизвестный источник: ${source}`);
    }
  }
}
