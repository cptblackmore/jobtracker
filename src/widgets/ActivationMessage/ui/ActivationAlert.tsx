import { Alert, AlertTitle } from "@mui/material";

interface Props {
  severity: 'success' | 'warning' | 'error',
  title: string,
  children: React.ReactNode
}

export const ActivationAlert: React.FC<Props> = ({ severity, title, children }) => {
  return (
    <Alert severity={severity} variant="outlined">
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};
