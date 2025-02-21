import { Sources } from "@entities/Vacancy/model/Sources";

export type VacancyPeriod = 0 | 1 | 3 | 7;

export type VacancyType = 'full' | 'shift' | 'fifo';

export interface VacancyParams {
  page: number;
  count: number;
  filters: {
    text?: string;
    period?: VacancyPeriod;
    salary?: {
      from?: number;
      to?: number;
    };
    type?: VacancyType;
    sources?: Sources[];
  }
}
