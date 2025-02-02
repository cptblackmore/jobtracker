import { AppBar, Container, Toolbar } from '@mui/material';
import { useNavMenu } from '../model/useNavMenu';
import { HeaderMd } from './HeaderMd';
import { HeaderXs } from './HeaderXs';
import { AuthButton } from './AuthButton';

interface Props {
  pages: Record<string, [string, string]>;
}

export const Header: React.FC<Props> = ({ pages }) => {
  const { handleCloseNavMenu, handleOpenNavMenu, anchorElNav } = useNavMenu();

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
