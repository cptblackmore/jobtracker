import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { StoresProvider } from './context/StoresProvider.tsx';
import { PagesProvider } from './context/PagesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoresProvider>
      <PagesProvider>
        <App />
      </PagesProvider>
    </StoresProvider>
  </StrictMode>,
);
