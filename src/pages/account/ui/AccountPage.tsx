import { Alert, Box, Button, Card, CardContent, Container, Divider, Typography as T } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { Nav } from '@widgets/Nav';
import { useContext } from 'react';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { FavoritesContext } from '@features/Favorites';

export const AccountPage: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);
  const { favoritesStore } = useContext(FavoritesContext);

  return (
    <>
      <Nav />
      <Container maxWidth='lg' >
        <Box
          maxWidth='md'
          margin='auto'
          paddingTop='2em'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Card sx={{width: '100%'}} >
            <CardContent>
              <T variant='h4' align='center' gutterBottom >
                Личный кабинет
              </T>
              <Divider sx={{marginBottom: '1em'}} />
              <Box>
                <T>E-mail: {authStore.user.email}</T>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                  <T>Синхронизация с базой данных:</T>
                  <FiberManualRecord color={favoritesStore.isSynced ? 'success' : 'error'} sx={{ mx: 1, fontSize: 18 }} />
                </Box>
                <T>Сохранённые вакансии: {favoritesStore.favoritesQuantity}</T>
                {!authStore.isActivated && (
                  <Box display='flex' flexDirection='column' sx={{ mt: 1 }} >
                    <Alert variant='outlined' severity='warning' >
                      Ваш аккаунт не активирован и избранные вакансии не сохраняются!
                    </Alert>
                    <Button variant='outlined' color='warning' sx={{ mt: 1 }} >Отправить ссылку повторно</Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
});
