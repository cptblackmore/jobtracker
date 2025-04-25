import { CssBaseline, GlobalStyles } from '@mui/material';
import { Router } from './router/Router';
import { Alerts } from '@shared/ui/Alert/Alerts';
import { AuthModal } from '@widgets/AuthModal';
import { AriaInformer, fonts, globalElementsIds, navElementsIds } from '@shared/ui';
import { Providers } from './context/Providers';
import { focusElementById, useShortcut } from '@shared/lib';
  
export const App = () => {
  useShortcut({action: () => focusElementById(navElementsIds.firstElement), key: 'n', altKey: true});
  useShortcut({action: () => window.scrollTo(0, 0), key: 't', altKey: true});

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
