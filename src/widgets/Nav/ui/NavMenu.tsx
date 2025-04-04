import { Box, CircularProgress, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountMenuItems } from './AccountMenuItems';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';
import { useMenu } from '../model/useMenu';
import { PagesContext } from '@shared/lib';
import { useNavigate } from 'react-router';
import { FavoritesContext } from '@features/Favorites';
import { observer } from 'mobx-react-lite';

export const NavMenu: React.FC = observer(() => {
  const { handleCloseMenu, handleOpenMenu, anchorElMenu } = useMenu();
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { pages } = useContext(PagesContext);

  return (
    <Box>
      <IconButton
        size='large'
        onClick={handleOpenMenu}
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          transition: 'color 0.3s'
        }}
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
        open={!!anchorElMenu}
        onClose={handleCloseMenu}
      >
        {Object.values(pages).map((page) => (
          page.inNav && (
            <MenuItem key={page.id} onClick={() => {handleCloseMenu(); navigate(page.path)}} >
              {page.name}
              {page.id === 2 && favoritesStore.ids.length > 0 ? ` (${favoritesStore.ids.length})` : ''}
            </MenuItem>
          )
        ))}
        <Divider />
        {authStore.isInit ? (
          authStore.isAuth ? (
            <AccountMenuItems handleCloseMenu={handleCloseMenu} />
          ) : (
            <MenuItem key='login' onClick={() => {handleCloseMenu(); authStore.setModalOpen(true)}} >
              Вход
            </MenuItem>
          )
        ) : (
          <MenuItem sx={{justifyContent: 'center'}} >
            <CircularProgress size={25} />
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
});
