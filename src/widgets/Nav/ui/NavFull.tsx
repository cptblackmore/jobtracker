import { Box, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '@shared/model';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { AccountMenu } from './AccountMenu';
import { useContext } from 'react';
import { NavToolbar } from './NavToolbar';

export const NavFull: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box flexGrow={1} display='flex' justifyContent='space-between' >
      <Box display='flex' >
        <Logo/>
        <NavToolbar />
      </Box>
      <Box display='flex' >
        {authStore.isAuth ? (
          <AccountMenu />
        ) : (
          authStore.isLoading ? (
            <Box display='flex' alignItems='center' >
              <CircularProgress size={25} sx={{color: 'white', mr: 2.5}} />
            </Box>
          ) : (
            <Button sx={{color: 'white'}} onClick={() => authStore.setModalOpen(true)} >Вход</Button>
          )
        )}
      </Box>
    </Box>
  );
});
