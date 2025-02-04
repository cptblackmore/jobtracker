import { Alert, AlertTitle, Box, CardContent, Divider, Typography } from "@mui/material";
import { errorMessages } from "@shared/lib/errorMessages";

interface Props {
  success: boolean;
  errorCode: string;
}

export const ActivationLinkStatus: React.FC<Props> = ({ success, errorCode }) => {
  const errorMessage = errorMessages[errorCode] ?? errorMessages.UNKNOWN_ERROR;
  let description: string = 'Теперь избранные вакансии сохраняются на вашем аккаунте и могут быть доступны с любого устройства.';
  if (!success) {
    switch (errorCode) {
      case 'ACTIVATION_LINK_NOT_FOUND':
        description = 'Убедитесь, что перешли по актуальной ссылке, отправленной на вашу электронную почту. Если ссылка не работает, свяжитесь с поддержкой.';
        break;
      case 'USER_ALREADY_ACTIVATED':
        description = 'Если избранные вакансии не сохраняются на вашем аккаунте или вы продолжаете получать уведомления об активации аккаунта, свяжитесь с поддержкой.'
        break;
      default:
        description = `Код: "${errorCode}". Свяжитесь с поддержкой.`
    }
  }

  return (
    <CardContent>
      <Typography variant='h4' align='center' gutterBottom >
        Активация аккаунта
      </Typography>
      <Divider sx={{ marginY: '1em' }} />
      {success ? (
        <Alert severity='success' variant='outlined' >
          <AlertTitle>Успех!</AlertTitle>
          Ваш аккаунт успешно активирован.
        </Alert>
      ) : (
        <Alert severity='error' variant='outlined' >
          <AlertTitle>Ошибка активации!</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      <Box marginTop='2em' >
        <Typography variant='body1' >
          {description}
        </Typography>
      </Box>
    </CardContent>
  );
};
