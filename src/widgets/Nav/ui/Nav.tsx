import { AppBar, Box, Container, Slide, useMediaQuery, useTheme } from '@mui/material';
import { NavCompact } from './NavCompact';
import { NavFull } from './NavFull';
import { useHideNav } from '../model/useHideNav';

export const Nav: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { isVisible } = useHideNav();

  return (
    <Slide appear={false} direction="down" in={isSm ? isVisible : true} >
      <AppBar position='sticky' sx={{backgroundColor: (theme) => theme.palette.primary.main}} >
        <Container maxWidth='xl' sx={{px: 1}} >
          <Box flexGrow={1} display={{xs: 'grid', md: 'none'}} >
            <NavCompact />
          </Box>
          <Box flexGrow={1} display={{xs: 'none', md: 'flex'}} >
            <NavFull />
          </Box>
        </Container>
      </AppBar>
    </Slide>
  );
};
