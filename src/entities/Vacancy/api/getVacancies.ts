import { Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { adapterHH } from './adapters/adapterHH';
import { adapterSuperjob } from './adapters/adapterSuperjob';
import { adapterTrudvsem } from './adapters/adapterTrudvsem';

export const getVacancies = async (page: number): Promise<Vacancy[]> => {
    const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
      VacancyService.getSuperjob(page), 
      VacancyService.getHH(page), 
      VacancyService.getTrudvsem(page)
    ]);
    return [
      ...adapterSuperjob(responseSuperjob),
      ...adapterHH(responseHH),
      ...adapterTrudvsem(responseTrudvsem)
    ];
}
