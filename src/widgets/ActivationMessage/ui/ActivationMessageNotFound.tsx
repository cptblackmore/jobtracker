import { Box } from '@mui/material';
import { ActivationAlert } from './ActivationAlert';
import { Typography as T } from '@mui/material';
import { CooldownButton } from '@shared/ui';
import { AuthStore } from '@features/Auth';
import { errorMessages } from '@shared/lib/error/errorMessages';
import { observer } from 'mobx-react-lite';

interface Props {
  authStore: AuthStore
}

export const ActivationMessageNotFound: React.FC<Props> = observer(({ authStore }) => {
  return (
    <>
      <ActivationAlert severity='error' title='Ошибка!' >
        {errorMessages['ACTIVATION_LINK_NOT_FOUND']}
      </ActivationAlert>
      <Box mt={3} >
        <T>Убедитесь, что перешли по актуальной ссылке из письма. Если письмо не приходит, попробуйте ещё раз.</T>
        <Box marginTop='1em' display='flex' justifyContent='center' >
          {authStore.isAuth ? (
            <CooldownButton
              variant='outlined'
              color='warning'
              sx={{mt: 1, width: {xs: '100%', sm: 'auto'}}}
              onClick={() => authStore.resend()}
              cooldown={authStore.resendCooldown}
              onCooldownEnd={() => authStore.updateCurrentTime()}
            >
              Отправить письмо повторно
            </CooldownButton>
          ) : (
            <ActivationAlert severity='warning' title='Внимание!' >
              Авторизуйтесь, чтобы повторная отправка письма стала доступна.
            </ActivationAlert>
          )}
        </Box>
      </Box>
    </>
  );
});
