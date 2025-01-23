import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '@widgets/Logo';
import { Link as RouterLink } from 'react-router';

interface Props {
  pages: Record<string, [string, string]>;
  handleCloseNavMenu: () => void;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: null | HTMLElement;
}

export const HeaderXs: React.FC<Props> = ({ pages, handleCloseNavMenu, handleOpenNavMenu, anchorElNav }) => {
  return (
    <Box sx={{display: {xs: 'flex', md: 'none'}, justifyContent: 'space-between', width: '100%'}} >
      <Box flexGrow={1} >
        <IconButton
          size="large"

          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {Object.values(pages).map((page) => (
            <MenuItem key={page[0]} onClick={handleCloseNavMenu} href={page[1]} >
              <Button component={RouterLink} to={page[1]} sx={{ textAlign: 'center' }}>{page[0]}</Button>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box flexGrow={1} display='flex' alignItems='center' >
        <Logo titleSize="h5"/>
      </Box>
    </Box>
  );
};
