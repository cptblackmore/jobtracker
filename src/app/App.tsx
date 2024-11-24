import { CssBaseline } from '@mui/material'
import { css, Global } from '@emotion/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { HomePage } from '@pages/home'

function App() {
  return (
    <>
      <CssBaseline>
          <Global 
            styles={css`
              body {
                background-color:#36364d;
                padding-top: 0.5em;
              }
            `}
          />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<HomePage />} />
            </Routes>
          </BrowserRouter>
      </CssBaseline>
    </>
  )
}

export default App
