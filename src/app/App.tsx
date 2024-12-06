import { CssBaseline } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { HomePage } from '@pages/home'
import { GlobalStyles } from './GlobalStyles'

export const App = () => {
  return (
    <>
      <CssBaseline>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<HomePage />} />
            </Routes>
          </BrowserRouter>
      </CssBaseline>
    </>
  );
}
