import { Box, Button, Menu } from '@mui/material';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useMenu } from '../model/useMenu';
import { AccountMenuItems } from './AccountMenuItems';

export const AccountMenu: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { handleCloseMenu, handleOpenMenu, anchorElMenu } = useMenu();


  return (
    <Box display='flex' alignItems='center' >
      <Button sx={{color: 'white'}} onClick={handleOpenMenu}>{authStore.user.email.split('@')[0]}</Button>
      <Menu
        id='menu-appbar'
        anchorEl={anchorElMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElMenu)}
        onClose={handleCloseMenu}
      >
        <AccountMenuItems handleCloseMenu={handleCloseMenu} />
      </Menu>
    </Box>
  );
});
