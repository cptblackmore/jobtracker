import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { AlertsStore } from '@shared/model';
import { FavoritesStore, getFavoritesLS } from '@features/Favorites';
import { typedEntries } from '@shared/lib';
import { getVacanciesByIds } from '@entities/Vacancy/api/getVacanciesByIds';
import axios, { AxiosError } from 'axios';
import { deleteFromFavoritesLS } from '@features/Favorites/model/deleteFromFavoritesLS';
import { getSourceBatches } from './getSourceBatches';
import { handleErrors } from './handleErrors';

export const fetchFavorites = async (
  idChunk: string[], 
  signal: AbortSignal,
  alertsStore: AlertsStore,
  favoritesStore: FavoritesStore,
  onProgress?: (completed: number) => void
): Promise<Vacancy[]> => {
  const errorCodes = new Set<string>();

  const batches = typedEntries(getSourceBatches(idChunk));

  const progressStep = 100 / idChunk.length;
  let completedPromises = 0;

  const trackPromise = <T>(promise: Promise<T>, length = 1): Promise<T> =>
    promise.finally(() => {
      completedPromises += length;
      if (onProgress) {
        onProgress(completedPromises * progressStep);
      }
    });

  const results = await Promise.all(
    batches.map(async ([source, ids]): Promise<Vacancy[] | null> => {
      try {
        if (source === 'sj') {
          const result = await trackPromise(getVacanciesByIds(ids, source, signal), ids.length);
          if (result.missingIds && result.missingIds.length > 0) {
            deleteFromFavoritesLS(result.missingIds.map(id => source + '_' + id));
            console.log('1');
            errorCodes.add('FAVORITES_NOT_FOUND');
          }
          return result.vacancies;
        } else {
          const settledResults = await Promise.allSettled(
            ids.map(id => trackPromise(getVacancyById(id, source, signal)))
          );
  
          settledResults.forEach(result => {
            if (result.status === 'rejected') {
              if (result.reason instanceof AxiosError) {
                const code = result.reason.code ?? 'UNKNOWN_ERROR';
                if (code === 'FAVORITES_NOT_FOUND') {
                  const missingId = result.reason.request?.data.id ?? '';
                  deleteFromFavoritesLS(source + '_' + missingId);
                  console.log('2');
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
    handleErrors(errorCodes, alertsStore, () => favoritesStore.updateFavorites(getFavoritesLS()));
  }
  
  return results.flat().filter(result => result != null);
};
