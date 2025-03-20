import { Box, Button } from '@mui/material';
import { AuthContext } from '@shared/model';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { AccountMenu } from './AccountMenu';
import { useContext } from 'react';
import { NavToolbar } from './NavToolbar';
import { LoginButton } from './LoginButton';
import { Contrast } from '@mui/icons-material';
import { ThemesContext } from '@shared/theme/ThemesContext';

export const NavFull: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { toggleThemeMode } = useContext(ThemesContext);

  return (
    <Box flexGrow={1} display='flex' justifyContent='space-between' >
      <Box display='flex' >
        <Logo/>
        <NavToolbar />
      </Box>
      <Box display='flex' >
        <Button 
          sx={{color: (theme) => theme.palette.primary.contrastText}}
          onClick={toggleThemeMode}
        >
          <Contrast />
        </Button>
        {authStore.isAuth ? (
          <AccountMenu />
        ) : (
          <LoginButton />
        )}
      </Box>
    </Box>
  );
});
