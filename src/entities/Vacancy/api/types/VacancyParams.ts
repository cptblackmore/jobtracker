import { Sources } from "@entities/Vacancy/model/Sources";

export type VacancyPeriod = 0 | 1 | 3 | 7;

export type VacancyType = 'full' | 'shift' | 'fifo';

export type SwitchableVacancyType = 'none' | VacancyType;

export interface VacancySalary {
  from?: number;
  to?: number;
}

export interface SwitchableVacancySalary extends VacancySalary {
  enabled?: boolean;
}

export interface VacancyParams {
  page: number;
  count: number;
  filters: {
    text?: string;
    period?: VacancyPeriod;
    salary?: VacancySalary;
    type?: VacancyType;
    place?: string;
    excludedSources?: Sources[];
  }
}
