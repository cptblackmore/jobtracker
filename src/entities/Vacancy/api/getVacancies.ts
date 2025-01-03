import { Vacancy, VacancyParams, servicesRegistry } from '@entities/Vacancy';
import { VacancyRequestService } from './VacancyRequestService';

export const getVacancies = async (params: VacancyParams): Promise<Vacancy[]> => {
  const adapterSuperjob = servicesRegistry.superjob.adapter;
  const adapterHH = servicesRegistry.hh.adapter;
  const adapterTrudvsem = servicesRegistry.trudvsem.adapter;

  const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
    VacancyRequestService.getSuperjob(adapterSuperjob.adaptParams(params)),
    VacancyRequestService.getHH(adapterHH.adaptParams(params)), 
    VacancyRequestService.getTrudvsem(adapterTrudvsem.adaptParams(params))
  ]);

  return [
    ...adapterSuperjob.adaptVacancies(responseSuperjob),
    ...adapterHH.adaptVacancies(responseHH),
    ...adapterTrudvsem.adaptVacancies(responseTrudvsem)
  ];
}
