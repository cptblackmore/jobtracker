import { Box, CircularProgress, Grid2 } from '@mui/material';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { NavMenu } from './NavMenu';
import { useContext } from 'react';
import { AuthContext } from '@shared/model';
import { ToggleThemeButton } from './ToggleThemeButton';

export const NavCompact: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <Grid2 container >
      <Grid2 size={3} >
        <Box display='flex' alignItems='center' justifyContent='flex-start' height='100%' gap={1} >
          <NavMenu />
          {authStore.isLoading && (
            <CircularProgress 
              size={25} 
              sx={{mr: 2, color: (theme) => theme.palette.primary.contrastText}}
            />
          )}
        </Box>
      </Grid2>
      <Grid2 size={6} >
        <Box display='flex' alignItems='center' justifyContent='center' height='100%' >
          <Logo iconSize='1.5em' titleSize='h5'/>
        </Box>
      </Grid2>
      <Grid2 size={3} >
        <Box display='flex' alignItems='center' justifyContent='flex-end' height='100%' >
          <ToggleThemeButton />
        </Box>
      </Grid2>
    </Grid2>
  );
});
