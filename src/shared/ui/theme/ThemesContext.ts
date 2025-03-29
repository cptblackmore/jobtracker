import { createContext } from 'react';

export const ThemesContext = createContext({
  themeMode: 'light',
  toggleThemeMode: () => {},
  config: {
    muiPaperOverlay: {bgcolor: '#fff', opacity: 0.051}
  }
});
