import { AppBar, Container, Toolbar } from '@mui/material';
import { useNavMenu } from '../model/useNavMenu';
import { HeaderMd } from './HeaderMd';
import { HeaderXs } from './HeaderXs';
import { AuthButton } from './AuthButton';
import { useContext } from 'react';
import { PagesContext } from '@shared/lib/PagesContext';

export const Header: React.FC = () => {
  const { handleCloseNavMenu, handleOpenNavMenu, anchorElNav } = useNavMenu();
  const pages = useContext(PagesContext);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant='dense'>
          <HeaderMd pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
          <HeaderXs pages={pages} handleCloseNavMenu={handleCloseNavMenu} handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav} />
          <AuthButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
