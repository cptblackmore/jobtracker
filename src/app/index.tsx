import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { StoresProvider } from './StoresProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoresProvider>
      <App />
    </StoresProvider>
  </StrictMode>,
);
