import { Box, CircularProgress, Grid2 } from '@mui/material';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { NavMenu } from './NavMenu';
import { useContext } from 'react';
import { AuthContext } from '@shared/model';

export const NavCompact: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <Grid2 container >
      <Grid2 size={3} >
        <NavMenu />
      </Grid2>
      <Grid2 size={6} >
        <Box display='flex' alignItems='center' justifyContent='center' height='100%' >
          <Logo titleSize='h5'/>
        </Box>
      </Grid2>
      <Grid2 size={3} >
        {authStore.isLoading && (
          <Box display='flex' justifyContent='flex-end' alignItems='center' height='100%' >
            <CircularProgress 
              size={25} 
              sx={{mr: 2, color: (theme) => theme.palette.primary.contrastText}}
            />
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
});
