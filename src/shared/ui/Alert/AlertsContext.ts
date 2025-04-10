import { createContext } from 'react';
import { AlertsStore } from '@shared/ui';

interface State {
  alertsStore: AlertsStore;
}

const alertsStore = new AlertsStore();

export const AlertsContext = createContext<State>({ alertsStore });
export { alertsStore };
