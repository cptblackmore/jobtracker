import { nanoid } from "nanoid";

interface BaseAlert {
  id: string;
  message: string;
}

export interface Success extends BaseAlert {
  severity: 'success';
}

export interface Info extends BaseAlert {
  severity: 'info';
}

export interface Warning extends BaseAlert {
  severity: 'warning';
}

export interface Error extends BaseAlert {
  severity: 'error';
}

export type Alert = Success | Info | Warning | Error;

export const createAlert = (message: string, severity: Alert['severity']): Alert =>
  ({
    id: nanoid(),
    message,
    severity
  } as Alert);
