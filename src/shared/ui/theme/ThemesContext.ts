import { createContext } from 'react';

interface ThemesState {
  themeMode: 'light' | 'dark',
  toggleThemeMode: () => void,
  config: {
    muiPaperOverlay: {bgcolor: string, opacity: number}
  }
}

export const ThemesContext = createContext<ThemesState>({
  themeMode: 'light',
  toggleThemeMode: () => {},
  config: {
    muiPaperOverlay: {bgcolor: '#fff', opacity: 0.051}
  }
});
