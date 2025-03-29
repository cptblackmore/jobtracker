import { CssBaseline, GlobalStyles } from '@mui/material';
import { Router } from './router/Router';
import { Alerts } from '@shared/ui/Alerts';
import { AuthModal } from '@widgets/AuthModal';
import { ThemesProvider } from './context/ThemesProvider';
import { fonts } from '@shared/ui';
  
export const App = () => {
  return (
    <>
      <ThemesProvider>
        <CssBaseline />
        <GlobalStyles styles={{fonts}} />
        <Router />
        <Alerts />
        <AuthModal />
      </ThemesProvider>
    </>
  );
}
