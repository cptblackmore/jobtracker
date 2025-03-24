import { DarkMode, DarkModeOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ThemesContext } from '@shared/theme/ThemesContext';
import { ToggleIconButton } from '@shared/ui';
import { useContext } from 'react';

export const ToggleThemeButton: React.FC = () => {
  const { themeMode, toggleThemeMode } = useContext(ThemesContext); 

  return (
    <Box pb={0.2} >
      <ToggleIconButton
        isToggled={themeMode === 'dark'}
        onToggle={toggleThemeMode}
        defaultIcon={<DarkModeOutlined sx={{color: (theme) => theme.palette.primary.contrastText}} />}
        toggledIcon={<DarkMode sx={{color: (theme) => theme.palette.primary.contrastText}} />}
        defaultTooltip='Включить темную тему'
        toggledTooltip='Включить светлую тему'
        options={{
          size: 1,
          tooltipEnterDelay: 0,
          tooltipLeaveDelay: 0
        }}
      />
    </Box>
  );
}
