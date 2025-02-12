import { Box, Typography as T } from '@mui/material';
import { errorMessages } from '@shared/lib/errorMessages';
import { AuthContext } from '@shared/model';
import { CooldownButton } from '@shared/ui';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { ActivationAlert } from './ActivationAlert';

interface Props {
  code: string;
}

export const ActivationMessages: React.FC<Props> = observer(({ code }) => {
  const { authStore } = useContext(AuthContext);

  useEffect(() => {
    authStore.updateCurrentTime();
  }, []);

  const activationMessages: Record<string, JSX.Element> = {
    ACTIVATION_SUCCESS: (
      <>
        <ActivationAlert severity="success" title="Успех!">
          <T>Ваш аккаунт успешно активирован.</T>
        </ActivationAlert>
        <Box marginTop="2em">
          <T>Теперь избранные вакансии сохраняются на вашем аккаунте и доступны с любого устройства.</T>
        </Box>
      </>
    ),
    USER_ALREADY_ACTIVATED: (
      <>
        <ActivationAlert severity="warning" title="Ошибка!">
          <T>{errorMessages['USER_ALREADY_ACTIVATED']}</T>
        </ActivationAlert>
        <Box marginTop="2em">
          <T>Если у вас всё ещё есть проблемы, свяжитесь с поддержкой.</T>
        </Box>
      </>
    ),
    ACTIVATION_LINK_NOT_FOUND: (
      <>
        <ActivationAlert severity="error" title="Ошибка!">
          <T>{errorMessages['ACTIVATION_LINK_NOT_FOUND']}</T>
        </ActivationAlert>
        <Box marginTop="2em">
          <T>Убедитесь, что перешли по актуальной ссылке из письма. Если письмо не приходит, попробуйте ещё раз.</T>
          <Box marginTop="1em" display="flex" justifyContent="center">
            {authStore.isAuth ? (
              <CooldownButton
                variant="outlined"
                color="warning"
                sx={{ mt: 1 }}
                onClick={authStore.resend}
                cooldown={authStore.resendCooldown}
                onCooldownEnd={authStore.updateCurrentTime}
              >
                Отправить письмо повторно
              </CooldownButton>
            ) : (
              <ActivationAlert severity="warning" title="Ошибка!">
                <T>Авторизуйтесь, чтобы повторная отправка письма стала доступна.</T>
              </ActivationAlert>
            )}
          </Box>
        </Box>
      </>
    ),
  };

  if (code !== 'ACTIVATION_SUCCESS' && authStore.isActivated) {
    return activationMessages['USER_ALREADY_ACTIVATED'];
  }

  return activationMessages[code] || (
    <>
      <ActivationAlert severity="error" title="Ошибка!">
        <T>{errorMessages['UNKNOWN_ERROR']}</T>
      </ActivationAlert>
      <Box marginTop="2em">
        <T>Обратитесь в поддержку.</T>
        <T>Код:</T>
        <T
          variant="body1"
          fontFamily="monospace"
          paddingLeft={1}
          paddingRight={1}
          sx={{ backgroundColor: 'rgb(60, 60, 60)', color: 'rgb(255, 255, 255)' }}
        >
          {code}
        </T>
      </Box>
    </>
  );
});
