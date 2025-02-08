import { Alert, AlertTitle, Box, Button, Typography as T } from '@mui/material';
import { errorMessages } from '@shared/lib/errorMessages';
import { AuthContext } from '@shared/model';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

interface Props {
  success: boolean;
  errorCode?: string;
}

export const ActivationLinkStatus: React.FC<Props> = observer(({ success, errorCode }) => {
  const { authStore } = useContext(AuthContext);
  const isAuth = authStore.isAuth;

  if (authStore.isActivated) return (
    <T>Ваш аккаунт не нуждается в активации. Если у вас всё ещё есть проблемы, свяжитесь с поддержкой.</T>
  )

  let title: string;
  let severity: 'success' | 'error';
  let description: JSX.Element;
  let alertMessage: string = '';

  if (success) {
    title = 'Успех!';
    severity = 'success';
    description = isAuth
      ? <T>Теперь избранные вакансии сохраняются на вашем аккаунте и доступны с любого устройства.</T>
      : <T>Ваш аккаунт активирован! Чтобы использовать избранное, войдите в аккаунт.</T>;
    alertMessage = 'Ваш аккаунт успешно активирован!';

  } else {
    title = 'Ошибка активации!';
    severity = 'error';
    alertMessage = errorMessages[errorCode ?? 'UNKNOWN_ERROR'] ?? errorMessages.UNKNOWN_ERROR;

    switch (errorCode) {
      case 'USER_ALREADY_ACTIVATED':
        description = <T>Этот аккаунт уже активирован. Если у вас всё ещё есть проблемы, свяжитесь с поддержкой.</T>;
        break;
      case 'ACTIVATION_LINK_NOT_FOUND':
        description = (
          <>
            <T>Убедитесь, что перешли по актуальной ссылке из письма. Если письмо не приходит, попробуйте ещё раз.</T>  
            {authStore.isAuth ? (
                <Box marginTop='1em' display='flex' justifyContent='center' >
                <Button variant='contained' onClick={() => authStore.resend()} >
                  Отправить письмо повторно
                </Button>
              </Box>
            ) : (
              <T>Авторизуйтесь, чтобы повторная отправка письма стала доступна.</T>
            )}
          </>
        );
        break;
      default:
        description = (
          <>
            Обратитесь в поддержку. <br/>
            Код:
            <T 
              variant='body1' 
              fontFamily='monospace'
              paddingLeft={1}
              paddingRight={1}
              sx={{backgroundColor: 'rgb(60, 60, 60)', color: 'rgb(255, 255, 255)'}} 
            >
              {errorCode}
            </T>
          </>
        );
        break;
    }
  }

  return (
      <>
        <Alert severity={severity} variant='outlined'>
          <AlertTitle>{title}</AlertTitle>
          {alertMessage}
        </Alert>
        <Box marginTop='2em' >
          {description}
        </Box>
      </>
  );
});
