import { Box, Button, CircularProgress } from "@mui/material";
import { AuthContext } from "@shared/model";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const AuthButton: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  return (
    <Box display='flex' justifyContent='center' alignItems='center' width='auto' >
    {authStore.isLoading ? (
      <CircularProgress size='2em' sx={{color: 'white', marginLeft: '1em', marginRight: '1em'}} />
    ) : (
      authStore.isAuth ? (
        <Button sx={{color: 'white'}} onClick={() => authStore.logout()}>Выход</Button>
      ) : (
        <Button sx={{color: 'white'}} onClick={() => authStore.setModalOpen(true)}>Вход</Button>
      )
    )}
  </Box>
  );
});
