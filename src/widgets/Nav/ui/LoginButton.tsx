import { Box, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

export const LoginButton: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    authStore.isLoading ? (
      <Box display='flex' alignItems='center' >
        <CircularProgress size={25} sx={{color: 'white', mr: 2.5}} />
      </Box>
    ) : (
      <Button sx={{color: 'white'}} onClick={() => authStore.setModalOpen(true)} >Вход</Button>
    )
  );
});
