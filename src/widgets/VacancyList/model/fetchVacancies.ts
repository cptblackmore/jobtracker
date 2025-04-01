import { getVacancies, sourcesRegistry, Vacancy, VacancyParams } from '@entities/Vacancy';
import { AlertsStore } from '@shared/model';
import axios, { AxiosError } from 'axios';
import { handleErrors } from '../../FavoritesList/model/handleErrors';
import { typedKeys } from '@shared/lib';

export const fetchVacancies = async (
  params: VacancyParams,
  signal: AbortSignal,
  alertsStore: AlertsStore
): Promise<Vacancy[]> => {
  const errors = new Set<string>();

  const sources = typedKeys(sourcesRegistry).filter(source => !params.filters.excludedSources?.includes(source));

  const results = await Promise.allSettled(
    sources.map(async (source) => {
      try {
        return await getVacancies(params, source, signal);
      } catch (e) {
        return Promise.reject(e);
      }
    })
  )

  results.forEach(result => {
    if (result.status === 'rejected') {
      if (axios.isCancel(result.reason)) throw result.reason;
      if (result.reason instanceof AxiosError) {
        const code = result.reason.response?.data?.code ?? result.reason.code ?? null;
        if (code) errors.add(code);
      }
    }
  });

  if (errors.size > 0) {
    handleErrors(errors, alertsStore);
  }

  return results
  .filter((result): result is PromiseFulfilledResult<Vacancy[]> => result.status === 'fulfilled')
  .map(result => result.value)
  .flat();
}
