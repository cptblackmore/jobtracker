import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { handleErrors } from './handleErrors';
import { AlertsStore } from '@shared/model';
import { FavoritesStore, getFavorites } from '@features/Favorites';
import { typedEntries } from '@shared/lib';
import { getVacanciesByIds } from '@entities/Vacancy/api/getVacanciesByIds';
import axios, { AxiosError } from 'axios';
import { deleteFromFavorites } from '@features/Favorites/model/deleteFromFavorites';
import { getSourceBatches } from './getSourceBatches';

export const fetchFavorites = async (
  idChunk: string[], 
  signal: AbortSignal,
  alertsStore: AlertsStore,
  favoritesStore: FavoritesStore
): Promise<Vacancy[]> => {
  const errorCodes = new Set<string>();

  const batches = typedEntries(getSourceBatches(idChunk));

  const results = await Promise.all(
    batches.map(async ([source, ids]): Promise<Vacancy[] | null> => {
      try {
        if (source === 'sj') {
          const result = await getVacanciesByIds(ids, source, signal);
          if (result.missingIds && result.missingIds.length > 0) {
            deleteFromFavorites(result.missingIds.map(id => source + '_' + id));
            errorCodes.add('FAVORITES_NOT_FOUND');
          }
          return result.vacancies;
        } else {
          const settledResults = await Promise.allSettled(
            ids.map(id => getVacancyById(id, source, signal))
          );
  
          settledResults.forEach(result => {
            if (result.status === 'rejected') {
              if (result.reason instanceof AxiosError) {
                const code = result.reason.code ?? 'UNKNOWN_ERROR';
                if (code === 'FAVORITES_NOT_FOUND') {
                  const missingId = result.reason.request?.data.id ?? '';
                  deleteFromFavorites(source + '_' + missingId);
                  errorCodes.add('FAVORITES_NOT_FOUND');
                } else {
                  throw result.reason;
                }
              }
            }
          });
  
          return settledResults
            .filter((r): r is PromiseFulfilledResult<Vacancy> => r.status === 'fulfilled')
            .map(r => r.value);
          }
      } catch (e) {
        if (axios.isCancel(e)) return Promise.reject(e);
        if (e instanceof AxiosError) {
          const code = e.code ?? 'UNKNOWN_ERROR';
          if (code) errorCodes.add(code);
        }
        return null;
      }
    }
  ));
  
  if (errorCodes.size > 0) {
    handleErrors(errorCodes, alertsStore, () => favoritesStore.updateFavorites(getFavorites()));
  }
  
  return results.flat().filter(result => result != null);
};
