import { CssBaseline } from '@mui/material';
import { Router } from './router/Router';
import { Alerts } from '@shared/ui/Alerts';
import { AuthModal } from '@widgets/AuthModal';
import { ThemesProvider } from './context/ThemesProvider';
  
export const App = () => {
  return (
    <>
      <ThemesProvider>
        <CssBaseline />
        <Router />
        <Alerts />
        <AuthModal />
      </ThemesProvider>
    </>
  );
}
