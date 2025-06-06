import { createSlice } from '@reduxjs/toolkit';

export interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
});

export const favoritesReducer = favoritesSlice.reducer;
