import { createContext } from 'react';
import { AuthStore } from '@shared/model';

interface State {
  authStore: AuthStore;
}

const authStore = new AuthStore();

export const AuthContext = createContext<State>({ authStore });
export { authStore };
