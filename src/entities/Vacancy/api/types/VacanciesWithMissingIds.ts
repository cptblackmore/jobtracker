import { Vacancy } from '@entities/Vacancy/model/Vacancy';

export interface VacanciesWithMissingIds {
  vacancies: Vacancy[];
  missingIds?: string[];
}
