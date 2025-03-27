import { Box, Button, CardActions, CardHeader } from '@mui/material';
import { Typography as T } from '@mui/material';
import { AuthContext } from '@shared/model';
import { useContext } from 'react';

export const AccountActions: React.FC = () => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box flexGrow={1} display='flex' flexDirection='column' justifyContent='space-between' >
      <CardHeader 
        title={
          <T component='h2' variant='h6' >
            Действия
          </T>
        }
      />
      <CardActions sx={{p: 2, flexDirection: 'column', gap: 1, '& > :not(:first-of-type)': {ml: 0}}} >
        <Button variant='outlined' color='error' sx={{width: '100%'}} onClick={() => authStore.logout()} >Выход</Button>
      </CardActions>
    </Box>
  );
}
