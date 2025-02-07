import { Box, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountMenuItems } from './AccountMenuItems';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';
import { useMenu } from '../model/useMenu';
import { PagesContext } from '@shared/lib';
import { useNavigate } from 'react-router';

export const NavMenu: React.FC = () => {
  const { handleCloseMenu, handleOpenMenu, anchorElMenu } = useMenu();
  const { authStore } = useContext(AuthContext);
  const navigate = useNavigate();
  const pages = useContext(PagesContext);

  return (
    <Box>
      <IconButton
        size='large'
        onClick={handleOpenMenu}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorElMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElMenu)}
        onClose={handleCloseMenu}
      >
        {Object.values(pages).map((page) => (
          page.inNav && (
            <MenuItem key={page.id} onClick={() => {handleCloseMenu(); navigate(page.path)}} >
              {page.name}
            </MenuItem>
          )
        ))}
        <Divider />
        {authStore.isAuth ? (
          <AccountMenuItems handleCloseMenu={handleCloseMenu} />
        ) : (
          <MenuItem key='login' onClick={() => {handleCloseMenu(); authStore.setModalOpen(true)}} >
            Вход
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
