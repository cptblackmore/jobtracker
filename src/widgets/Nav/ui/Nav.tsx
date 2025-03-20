import { AppBar, Box, Container } from '@mui/material';
import { NavCompact } from './NavCompact';
import { NavFull } from './NavFull';

export const Nav: React.FC = () => {
  return (
    <AppBar position='sticky' sx={{backgroundColor: (theme) => theme.palette.primary.main}} >
      <Container maxWidth='xl' >
        <Box flexGrow={1} display={{xs: 'grid', md: 'none'}} >
          <NavCompact />
        </Box>
        <Box flexGrow={1} display={{xs: 'none', md: 'flex'}} >
          <NavFull />
        </Box>
      </Container>
    </AppBar>
  );
};
