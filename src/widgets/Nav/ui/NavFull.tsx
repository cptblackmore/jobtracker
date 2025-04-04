import { Box } from '@mui/material';
import { AuthContext } from '@shared/model';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { AccountMenu } from './AccountMenu';
import { useContext } from 'react';
import { NavToolbar } from './NavToolbar';
import { LoginButton } from './LoginButton';
import { ToggleThemeButton } from './ToggleThemeButton';

export const NavFull: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box flexGrow={1} display='flex' justifyContent='space-between' >
      <Box display='flex' >
        <Logo />
        <NavToolbar />
      </Box>
      <Box display='flex' alignItems='center' gap={2} >
        <ToggleThemeButton />
        {authStore.isAuth ? (
          <AccountMenu />
        ) : (
          <LoginButton />
        )}
      </Box>
    </Box>
  );
});
