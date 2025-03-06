import { Vacancy } from '@entities/Vacancy';
import { getVacancyById } from '@entities/Vacancy/api/getVacancyById';
import { handleErrors } from './handleErrors';
import { AlertsStore } from '@shared/model';
import { FavoritesStore, getFavorites } from '@features/Favorites';
import { SourceId } from '@entities/Vacancy/model/Sources';
import { typedEntries } from '@shared/lib';
import { getVacanciesByIds } from '@entities/Vacancy/api/getVacanciesByIds';
import axios, { AxiosError } from 'axios';

export const fetchFavorites = async (
  idChunk: string[], 
  signal: AbortSignal,
  alertsStore: AlertsStore,
  favoritesStore: FavoritesStore
): Promise<Vacancy[]> => {
  const errorCodes = new Set<string>();

  function getSourceBatches(idChunk: string[]) {
    const batches = idChunk.reduce<Record<SourceId, string[]>>((acc, id) => {
      const matches = id.match('^([^_]+)_(.*)$') ?? [];
      const source = matches[1] as SourceId;
      const rest = matches[2];

      if (!source || !rest) return acc;
      if (!acc[source]) {
          acc[source] = [];
      }
      acc[source].push(rest);
      return acc;
    }, {} as Record<SourceId, string[]>);
    return batches;
  }

  const batches = typedEntries(getSourceBatches(idChunk));

  const results = await Promise.all(
    batches.map(async ([source, ids]): Promise<Vacancy[] | null> => {
      try {
        if (source === 'sj') {
          return await getVacanciesByIds(ids, source, signal);
        } else {
          return await Promise.all(
            ids.map(async (id) => {
              return await getVacancyById(id, source, signal);
            }
          ));
        }
      } catch (e) {
        if (axios.isCancel(e)) return Promise.reject(e);
        if (e instanceof AxiosError) {
          const code = e.code ?? 'UNKNOWN_ERROR';
          if (code === 'FAVORITES_NOT_FOUND' || e.status === 404) {
            // deleteFromFavorites(id); // TODO make favorites deletion
            errorCodes.add('FAVORITES_NOT_FOUND')
          } else {
            if (code) errorCodes.add(code);
          }
        }
        return null;
      }
    }
  ))
  
  if (errorCodes.size > 0) {
    handleErrors(errorCodes, alertsStore, () => favoritesStore.updateFavorites(getFavorites()));
  }
  
  return results.flat().filter(result => result != null);
};
