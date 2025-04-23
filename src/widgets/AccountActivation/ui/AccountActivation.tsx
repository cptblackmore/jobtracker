import { Alert, Box, CardActions, CardContent, CardHeader, Divider } from '@mui/material';
import { AuthContext } from '@features/Auth';
import { accountPageElementsIds, CardHeaderTitle, CooldownButton } from '@shared/ui';
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
        <Box 
          component='section' 
          display='flex' 
          flexDirection='column' 
          role='region' 
          aria-labelledby={accountPageElementsIds.activationSectionTitle}
        >
          <CardHeader 
            title={
              <CardHeaderTitle id={accountPageElementsIds.activationSectionTitle} title='Активация' />
            }
            sx={{pb: {xs: 1, sm: 2}}}
          />
          <CardContent sx={{pb: 0}} >
            <Alert id={accountPageElementsIds.activationSectionMessage} variant='outlined' severity='warning' >
              Ваш аккаунт не активирован и избранные вакансии не сохраняются удалённо!
            </Alert>
          </CardContent>
          <CardActions sx={{justifyContent: 'center', p: 2, pt: {xs: 1, sm: 2}}} >
            <CooldownButton
              variant='contained' 
              color='warning'
              onClick={() => {
                authStore.resend();
              }}
              cooldown={authStore.resendCooldown}
              onCooldownEnd={() => authStore.updateCurrentTime()}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'auto'
                }
              }}
              aria-describedby={accountPageElementsIds.activationSectionMessage}
            >
              Отправить письмо повторно
            </CooldownButton>
          </CardActions>
        </Box>
      </>
    ) : null
  );
});
