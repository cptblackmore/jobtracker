import { FiberManualRecord } from '@mui/icons-material';
import { Box, CardContent } from '@mui/material';
import { Typography as T } from '@mui/material';
import { useContext } from 'react';
import { FavoritesContext } from '@features/Favorites';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';

export const AccountInfo: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <CardContent sx={{flexGrow: 2}} >
      <T variant='h6' align='left' mb={2} >
        Общая информация:
      </T>
      <T>E-mail: {authStore.user.email}</T>
      <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <T>Синхронизация с базой данных:</T>
        <FiberManualRecord color={favoritesStore.isSynced ? 'success' : 'error'} sx={{mx: 1, fontSize: 18}} />
      </Box>
      <T>Вакансий сохранено удалённо: {authStore.user.isActivated ? favoritesStore.ids.length : 0}</T>
    </CardContent>
  );
});
