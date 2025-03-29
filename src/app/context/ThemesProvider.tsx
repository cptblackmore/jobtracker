import { ThemeProvider } from '@emotion/react';
import { defineInitialTheme, darkTheme, lightTheme } from '@shared/ui/theme';
import { ThemesContext } from '@shared/ui/theme/ThemesContext';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode
}

export const ThemesProvider: React.FC<Props> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(defineInitialTheme());
  const toggleThemeMode = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newThemeMode);
    setThemeMode(newThemeMode);
  }
  const config = {
    muiPaperOverlay: {bgcolor: '#fff', opacity: 0.051}
  };

  return (
    <ThemesContext.Provider value={{themeMode, toggleThemeMode, config}} >
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme} >
          {children}
        </ThemeProvider>
    </ThemesContext.Provider>
  );
}
