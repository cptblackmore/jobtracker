import { createContext } from 'react';
import { alertsStore, AuthStore } from '@shared/model';

interface State {
  authStore: AuthStore;
}

const authStore = new AuthStore(alertsStore);

export const AuthContext = createContext<State>({ authStore });
export { authStore };
