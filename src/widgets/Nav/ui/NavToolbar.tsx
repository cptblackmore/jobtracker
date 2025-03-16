import { FavoritesContext } from '@features/Favorites';
import { Button, Toolbar, Tooltip } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router';

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
            sx={{ my: 1, color: 'white', display: 'block' }}
          >
            {page.name}
          </Button>
        </Tooltip>
      )
    ))}
  </Toolbar>
  );
});
