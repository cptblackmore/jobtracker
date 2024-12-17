export interface VacancyFilters {
  text?: string;
  period?: 0 | 1 | 3 | 7;
  salary?: {
    from: number;
    to: number;
  };
  type?: 'full' | 'part' | 'shift'
}
