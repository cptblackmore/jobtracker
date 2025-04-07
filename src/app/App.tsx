import { CssBaseline, GlobalStyles } from '@mui/material';
import { Router } from './router/Router';
import { Alerts } from '@shared/ui/Alerts';
import { AuthModal } from '@widgets/AuthModal';
import { fonts } from '@shared/ui';
import { Providers } from './context/Providers';
  
export const App = () => {
  return (
    <>
      <Providers>
        <CssBaseline />
        <GlobalStyles styles={{fonts}} />
        <Router />
        <Alerts />
        <AuthModal />
      </Providers>
    </>
  );
}
