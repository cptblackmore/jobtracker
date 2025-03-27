import { FiberManualRecord } from '@mui/icons-material';
import { Box, CardContent, CardHeader } from '@mui/material';
import { Typography as T } from '@mui/material';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';

export const AccountInfo: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <Box flexGrow={2} >
      <CardHeader 
        title={
          <T component='h2' variant='h6' >
            Общая информация
          </T>
        }
      />
      <CardContent sx={{'&:last-child': {pb: 2}}} >
        <T>E-mail: {authStore.user.email}</T>
        <Box sx={{display: 'flex', alignItems: 'center'}} >
          <T>Синхронизация с базой данных:</T>
          <FiberManualRecord color={favoritesStore.isSynced ? 'success' : 'error'} sx={{mx: 1, fontSize: 18}} />
        </Box>
        <T>Сохранено вакансий на сервере: {authStore.user.isActivated ? favoritesStore.ids.length : 0}</T>
      </CardContent>
    </Box>
  );
});
