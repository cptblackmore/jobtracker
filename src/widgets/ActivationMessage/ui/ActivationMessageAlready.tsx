import { Box } from '@mui/material';
import { ActivationAlert } from './ActivationAlert';
import { errorMessages } from '@shared/lib/error/errorMessages';
import { Typography as T } from '@mui/material';

export const ActivationMessageAlready: React.FC = () => {
  return (
    <>
      <ActivationAlert severity='warning' title='Ошибка!' >
        {errorMessages['USER_ALREADY_ACTIVATED']}
      </ActivationAlert>
      <Box mt={3} >
        <T>Если у вас всё ещё остались проблемы, свяжитесь с поддержкой.</T>
      </Box>
    </>
  );
}
