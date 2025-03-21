import { FavoritesContext } from '@features/Favorites';
import { Button, Toolbar, Tooltip } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router';
import { ToggleThemeButton } from './toggleThemeButton';

export const NavToolbar: React.FC = observer(() => {
  const pages = useContext(PagesContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <Toolbar variant='dense' >
      {Object.values(pages).map((page) => (
        page.inNav && (
          <Tooltip 
            title={
              page.id === 2 
              ? 
              `${favoritesStore.favorites.length > 0 ? `Вакансий в избранном: ${favoritesStore.favorites.length}` : 'Список избранных вакансий пуст'}` 
              : 
              ''
            } 
            key={page.id}
          >
            <Button
              key={page.id}
              component={RouterLink}
              to={page.path}
              sx={{my: 1, display: 'block', color: (theme) => theme.palette.primary.contrastText}}
            >
              {page.name}
            </Button>
          </Tooltip>
        )
      ))}
      <ToggleThemeButton />
    </Toolbar>
  );
});
