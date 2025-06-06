import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@features/Auth/model/authSlice';
import { favoritesReducer } from '@features/Favorites/model/favoritesSlice';
import { rtkApi } from '@shared/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
