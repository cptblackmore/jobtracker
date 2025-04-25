import { Box, CircularProgress, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountMenuItems } from './AccountMenuItems';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '@features/Auth';
import { useContext } from 'react';
import { useMenu } from '../model/useMenu';
import { PagesContext } from '@shared/config';
import { useNavigate } from 'react-router';
import { FavoritesContext } from '@features/Favorites';
import { observer } from 'mobx-react-lite';
import { navElementsIds } from '@shared/ui';

interface Props {
  id?: string;
}

export const NavMenu: React.FC<Props> = observer(({ id }) => {
  const { handleCloseMenu, handleOpenMenu, anchorElMenu } = useMenu();
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { currentPage, pages } = useContext(PagesContext);

  return (
    <Box>
      <IconButton
        id={id}
        size='large'
        onClick={handleOpenMenu}
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
          transition: 'color 0.3s'
        }}
        aria-label='Открыть меню навигации'
        aria-haspopup='menu'
        aria-expanded={!!anchorElMenu}
        aria-controls={navElementsIds.navMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id={navElementsIds.navMenu}
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
            <MenuItem 
              selected={currentPage?.id === page.id} 
              key={page.id} 
              onClick={() => {handleCloseMenu(); navigate(page.path)}} 
              aria-label={page.id === 2 && favoritesStore.ids.length > 0 ? `Избранное: Вакансий в избранном: ${favoritesStore.ids.length}` : page.name}
              aria-current={currentPage === page ? 'page' : undefined}
            >
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
            <MenuItem 
              key='login' 
              onClick={() => {handleCloseMenu(); authStore.setModalOpen(true)}} 
              aria-label='Открыть модальное окно входа' 
            >
              Вход
            </MenuItem>
          )
        ) : (
          <MenuItem sx={{justifyContent: 'center'}} >
            <CircularProgress 
              size={25} 
              role='status' 
              aria-live='polite' 
              aria-label='Загрузка аккаунта. Пожалуйста, подождите' 
            />
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
});
