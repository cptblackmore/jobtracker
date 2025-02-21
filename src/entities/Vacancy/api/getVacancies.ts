import { Vacancy, VacancyParams, servicesRegistry } from '@entities/Vacancy';
import { VacancyRequestService } from './VacancyRequestService';

export const getVacancies = async (params: VacancyParams): Promise<Vacancy[]> => {
  const adapterSuperjob = servicesRegistry.superjob.adapter;
  const adapterHH = servicesRegistry.hh.adapter;
  const adapterTrudvsem = servicesRegistry.trudvsem.adapter;

  const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
    params.filters?.sources?.includes('superjob') ? VacancyRequestService.getSuperjob(adapterSuperjob.adaptParams(params)) : [],
    params.filters?.sources?.includes('hh') ? VacancyRequestService.getHH(adapterHH.adaptParams(params)) : [], 
    params.filters?.sources?.includes('trudvsem') ? VacancyRequestService.getTrudvsem(adapterTrudvsem.adaptParams(params)) : []
  ]);

  return [
    ...adapterSuperjob.adaptVacancies(responseSuperjob),
    ...adapterHH.adaptVacancies(responseHH),
    ...adapterTrudvsem.adaptVacancies(responseTrudvsem)
  ];
}
