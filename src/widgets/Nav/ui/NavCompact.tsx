import { Box, Grid2 } from '@mui/material';
import { Logo } from '@widgets/Logo';
import { observer } from 'mobx-react-lite';
import { NavMenu } from './NavMenu';

export const NavCompact: React.FC = observer(() => {
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
      <Grid2 size={3} ></Grid2>
    </Grid2>
  );
});
