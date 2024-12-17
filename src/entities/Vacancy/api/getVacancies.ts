import { Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { adapterHH } from './adapters/adapterHH';
import { adapterSuperjob } from './adapters/adapterSuperjob';
import { adapterTrudvsem } from './adapters/adapterTrudvsem';
import { paramsAdapter } from './adapters/paramsAdapter';
import { VacancyFilters } from './types/VacancyFilters';

export const getVacancies = async (page: number, count: number, filters?: VacancyFilters): Promise<Vacancy[]> => {
    const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
      VacancyService.getSuperjob(paramsAdapter('superjob', page, count, filters)), 
      VacancyService.getHH(paramsAdapter('hh', page, count, filters)), 
      VacancyService.getTrudvsem(paramsAdapter('trudvsem', page, count, filters))
    ]);
    return [
      ...adapterSuperjob(responseSuperjob),
      ...adapterHH(responseHH),
      ...adapterTrudvsem(responseTrudvsem)
    ];
}
