import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { HomePage } from '@pages/home'
import { GlobalStyles } from './GlobalStyles'
import { FeedPage } from '@pages/feed'
import { theme } from './theme'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/feed' element={<FeedPage />} />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
