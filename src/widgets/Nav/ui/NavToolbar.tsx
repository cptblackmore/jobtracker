import { Button, Toolbar } from '@mui/material';
import { PagesContext } from '@shared/lib';
import { useContext } from 'react';
import { Link as RouterLink } from 'react-router';

export const NavToolbar: React.FC = () => {
  const pages = useContext(PagesContext);

  return (
    <Toolbar variant='dense' >
    {Object.values(pages).map((page) => (
      page.inNav && (
        <Button
          key={page.id}
          component={RouterLink}
          to={page.path}
          sx={{ my: 1, color: 'white', display: 'block' }}
        >
          {page.name}
        </Button>
      )
    ))}
  </Toolbar>
  );
};
