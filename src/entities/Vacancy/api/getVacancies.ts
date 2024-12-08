import { Vacancy } from '@entities/Vacancy';
import { VacancyService } from './VacancyService';
import { adapterHH } from './adapters/adapterHH';
import { adapterSuperjob } from './adapters/adapterSuperjob';
import { adapterTrudvsem } from './adapters/adapterTrudvsem';

export const getVacancies = async (page: number, count: number): Promise<Vacancy[]> => {
    const [responseSuperjob, responseHH, responseTrudvsem] = await Promise.all([
      VacancyService.getSuperjob(page, count), 
      VacancyService.getHH(page, count), 
      VacancyService.getTrudvsem(page, count)
    ]);
    return [
      ...adapterSuperjob(responseSuperjob),
      ...adapterHH(responseHH),
      ...adapterTrudvsem(responseTrudvsem)
    ];
}
