import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

const root = document.getElementById('root')!;

const renderApp = (isDevMode: boolean) => {
  createRoot(root).render(
    isDevMode ? (
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <App />
    )
  );
}

renderApp(import.meta.env.VITE_MODE === 'development');
