import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: unknown | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
