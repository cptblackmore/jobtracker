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
        <T mb={1} >Код ошибки:</T>
        <T
          variant='body1'
          fontFamily='monospace'
          px={1}
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[800], 
            color: theme.palette.error.light,
            wordBreak: 'break-word', 
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          })}
        >
          {code}
        </T>
      </Box>
    </>
  );
}
