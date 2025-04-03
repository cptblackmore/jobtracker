import { DarkMode, DarkModeOutlined } from '@mui/icons-material';
import { ThemesContext } from '@shared/ui';
import { ToggleIconButton } from '@shared/ui';
import { useContext } from 'react';

export const ToggleThemeButton: React.FC = () => {
  const { themeMode, toggleThemeMode } = useContext(ThemesContext); 

  return (
    <ToggleIconButton
      isToggled={themeMode === 'dark'}
      onToggle={toggleThemeMode}
      defaultIcon={<DarkModeOutlined sx={{color: (theme) => theme.palette.primary.contrastText}} />}
      toggledIcon={<DarkMode sx={{color: (theme) => theme.palette.primary.contrastText}} />}
      defaultTooltip='Включить темную тему'
      toggledTooltip='Включить светлую тему'
      options={{
        tooltipEnterDelay: 300,
        tooltipLeaveDelay: 100
      }}
    />
  );
}
