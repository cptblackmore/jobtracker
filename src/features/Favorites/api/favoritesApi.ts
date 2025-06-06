import { rtkApi } from '@shared/api/rtkApi';
import type { FavoritesResponse } from '../model/types/FavoritesResponse';

export const favoritesApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    synchronize: builder.mutation<FavoritesResponse, FavoritesResponse['favorites']>({
      query: (favorites) => ({
        url: '/favorites/me/sync',
        method: 'PATCH',
        body: { favorites },
      }),
    }),
  }),
});

export const { useSynchronizeMutation } = favoritesApi;
