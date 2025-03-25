import { Box } from '@mui/material';
import { ActivationAlert } from './ActivationAlert';
import { errorMessages } from '@shared/lib/errorMessages';
import { Typography as T } from '@mui/material';

interface Props {
  code: string
}

export const ActivationMessageUnknown: React.FC<Props> = ({ code }) => {
  return (
    <>
      <ActivationAlert severity='error' title='Ошибка!' >
        {errorMessages['UNKNOWN_ERROR']}
      </ActivationAlert>
      <Box mt={3} >
        <T>Обратитесь в поддержку.</T>
        <T>Код:</T>
        <T
          variant='body1'
          fontFamily='monospace'
          px={1}
          sx={{backgroundColor: 'rgb(60, 60, 60)', color: 'rgb(255, 255, 255)'}}
        >
          {code}
        </T>
      </Box>
    </>
  );
}
