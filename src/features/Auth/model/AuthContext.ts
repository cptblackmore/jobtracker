import { createContext } from 'react';
import { AuthStore } from '@features/Auth';
import { alertsStore } from '@shared/ui';

interface State {
  authStore: AuthStore;
}

const authStore = new AuthStore(alertsStore);

export const AuthContext = createContext<State>({ authStore });
export { authStore };
