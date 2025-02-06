import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
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

  let title: string;
  let severity: 'success' | 'error';
  let description: string | JSX.Element;
  let alertMessage: string = '';

  if (success) {
    title = 'Успех!';
    severity = 'success';
    description = isAuth
      ? 'Теперь избранные вакансии сохраняются на вашем аккаунте и доступны с любого устройства.'
      : 'Ваш аккаунт активирован! Чтобы использовать избранное, войдите в аккаунт.';
    alertMessage = 'Ваш аккаунт успешно активирован!';

  } else {
    title = 'Ошибка активации!';
    severity = 'error';
    alertMessage = errorMessages[errorCode ?? 'UNKNOWN_ERROR'] ?? errorMessages.UNKNOWN_ERROR;

    switch (errorCode) {
      case 'USER_ALREADY_ACTIVATED':
        description = 'Этот аккаунт уже активирован. Если у вас всё ещё есть проблемы, свяжитесь с поддержкой.';
        break;
      case 'ACTIVATION_LINK_NOT_FOUND':
        description = (
          <>
            Убедитесь, что перешли по актуальной ссылке из письма. Если письмо не приходит, попробуйте ещё раз:  
            <Box marginTop="1em" display='flex' justifyContent='center' >
              <Button variant="contained" >
                Отправить ссылку повторно
              </Button>
            </Box>
          </>
        );
        break;
      default:
        description = (
          <>
            Обратитесь в поддержку. <br/>
            Код:
            <Typography 
              variant='body1' 
              fontFamily='monospace'
              paddingLeft={1}
              paddingRight={1}
              sx={{backgroundColor: 'rgb(60, 60, 60)', color: 'rgb(255, 255, 255)'}} 
            >
              {errorCode}
            </Typography>
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
          <Typography variant='body1' >
            {description}
          </Typography>
        </Box>
      </>
  );
});