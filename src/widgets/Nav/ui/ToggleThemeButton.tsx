import { Contrast } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ThemesContext } from '@shared/theme/ThemesContext';
import { useContext } from 'react';

export const ToggleThemeButton: React.FC = () => {
  const { toggleThemeMode } = useContext(ThemesContext); 

  return (
    <Button 
      sx={{color: (theme) => theme.palette.primary.contrastText}}
      onClick={toggleThemeMode}
    >
      <Contrast />
    </Button>
  );
}
