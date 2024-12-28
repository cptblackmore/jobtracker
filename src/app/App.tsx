import { CssBaseline, ThemeProvider } from '@mui/material'
import { GlobalStyles } from './GlobalStyles'
import { theme } from './theme'
import { Router } from './Router'
  
export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <GlobalStyles />
          <Router />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
