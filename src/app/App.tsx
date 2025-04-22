import { CssBaseline, GlobalStyles } from '@mui/material';
import { Router } from './router/Router';
import { Alerts } from '@shared/ui/Alert/Alerts';
import { AuthModal } from '@widgets/AuthModal';
import { AriaInformer, fonts, globalElementsIds } from '@shared/ui';
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
        <AriaInformer id={globalElementsIds.ariaInformer} />
      </Providers>
    </>
  );
}
