import { Alert, Box, CardActions, CardContent, CardHeader, Divider } from '@mui/material';
import { AuthContext } from '@shared/model';
import { CooldownButton } from '@shared/ui';
import { Typography as T } from '@mui/material';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const AccountActivation: React.FC = observer(() => {
  const { authStore } = useContext(AuthContext);

  useEffect(() => {
    authStore.updateCurrentTime();
  }, [authStore])

  return (
    !authStore.user.isActivated ? (
      <>
        <Divider />
        <Box display='flex' flexDirection='column' >
          <CardHeader 
            title={
              <T component='h2' variant='h6' >
                Активация:
              </T>
            }
          />
          <CardContent sx={{pb: 0}} >
            <Alert variant='outlined' severity='warning' >
              Ваш аккаунт не активирован и избранные вакансии не сохраняются удалённо!
            </Alert>
          </CardContent>
          <CardActions sx={{justifyContent: 'center', p: 2}} >
            <CooldownButton
              variant='contained' 
              color='warning'
              onClick={() => {
                authStore.resend();
              }}
              cooldown={authStore.resendCooldown}
              onCooldownEnd={() => authStore.updateCurrentTime()}
            >
              Отправить письмо повторно
            </CooldownButton>
          </CardActions>
        </Box>
      </>
    ) : null
  );
});
