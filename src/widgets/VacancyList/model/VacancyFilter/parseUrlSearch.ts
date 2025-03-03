import { sourcesRegistry, Sources, VacancyParams, VacancyPeriod, VacancyType } from '@entities/Vacancy';
import { validateValue, filterValidValues, typedKeys, typedEntries } from '@shared/lib';
import { SALARY_MIN, SALARY_MAX } from '@widgets/VacancyList/config/salaryConfig';
import { calculateSelectedFilters } from './calculateSelectedFilters';

export const parseUrlSearch = (search?: string): VacancyParams['filters'] | undefined => {
  const params = new URLSearchParams(typeof search === 'string' ? search : location.search);
  if (params.size === 0) return undefined;

  const text = params.get('text') ?? undefined;
  const period = validateValue(params.get('period'), [0, 1, 3, 7] as VacancyPeriod[], (v) => Number(v) as VacancyPeriod);
  const type = validateValue(params.get('type'), ['full', 'shift', 'fifo'] as VacancyType[]);
  const salaryFrom = validateValue(params.get('from'), [], Number, {range: {min: SALARY_MIN, max: SALARY_MAX}});
  const salaryTo = validateValue(params.get('to'), [], Number, {range: {min: SALARY_MIN, max: SALARY_MAX}});

  const excludedSources = new Set<Sources>(
    filterValidValues<Sources>(params.get('excludedSources')?.split(',') ?? [], typedKeys(sourcesRegistry))
  );
  const selectedFilters = calculateSelectedFilters(
    period ?? 0, 
    type ?? 'none', 
    !!((salaryFrom ?? null) || (salaryTo ?? null))
  );
  for (const [source, config] of typedEntries(sourcesRegistry)) {
    if (selectedFilters.some(filter => config.incompatibleFilters?.includes(filter))) {
      excludedSources.add(source);
    }
  }

  const parsedFilters: VacancyParams['filters'] = {
    text,
    period,
    type,
    salary: {
      from: salaryFrom,
      to: Number(salaryTo) < Number(salaryFrom) ? salaryFrom : salaryTo
    },
    excludedSources: Array.from(excludedSources)
  }
  
  return parsedFilters;
}
