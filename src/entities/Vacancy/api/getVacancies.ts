import { Vacancy, VacancyParams, sourcesRegistry } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';

export const getVacancies = async (params: VacancyParams, signal: AbortSignal): Promise<Vacancy[]> => {
  const adapterSuperjob = sourcesRegistry.superjob.adapter;
  const adapterHH = sourcesRegistry.hh.adapter;
  const adapterTrudvsem = sourcesRegistry.trudvsem.adapter;

  const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
    !params.filters?.excludedSources?.includes('superjob') ? VacancyService.getSuperjob(adapterSuperjob.adaptParams(params), signal) : [],
    !params.filters?.excludedSources?.includes('hh') ? VacancyService.getHH(adapterHH.adaptParams(params), signal) : [], 
    !params.filters?.excludedSources?.includes('trudvsem') ? VacancyService.getTrudvsem(adapterTrudvsem.adaptParams(params), signal) : []
  ]);

  return [
    ...adapterSuperjob.adaptVacancies(responseSuperjob),
    ...adapterHH.adaptVacancies(responseHH),
    ...adapterTrudvsem.adaptVacancies(responseTrudvsem)
  ];
}
