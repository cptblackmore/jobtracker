import { Box, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '@features/Auth';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { navElementsIds } from '@shared/ui';

export const LoginButton: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    authStore.isLoading ? (
      <Box display='flex' alignItems='center' >
        <CircularProgress 
          size={25}
          sx={{mr: 2.5, color: (theme) => theme.palette.primary.contrastText}} 
        />
      </Box>
    ) : (
      <Button
        id={navElementsIds.loginMenuButton}
        sx={{color: (theme) => theme.palette.primary.contrastText}} 
        onClick={() => authStore.setModalOpen(true, 'login')} 
      >
        Вход
      </Button>
    )
  );
});
