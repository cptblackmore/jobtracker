import { rtkApi } from '@shared/api/rtkApi';
import type { AuthResponse } from '@shared/api';

export const authApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
