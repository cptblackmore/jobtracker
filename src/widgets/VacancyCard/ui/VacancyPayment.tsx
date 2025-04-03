import { Vacancy } from '@entities/Vacancy';
import { Box, Typography as T, Theme } from '@mui/material';
import { formatNumberByCurrency } from '@shared/lib';

interface Props {
  vacancy: Vacancy;
  variant?: 'row' | 'column';
}

export const VacancyPayment: React.FC<Props> = ({ vacancy, variant='column' }) => {
  const paymentFrom = vacancy.paymentFrom ? formatNumberByCurrency(vacancy.paymentFrom, vacancy.currency) : null;
  const paymentTo = vacancy.paymentTo ? formatNumberByCurrency(vacancy.paymentTo, vacancy.currency) : null;
  const showDash = variant === 'row' && paymentFrom && paymentTo;

  const textStyle = (theme: Theme) => ({
    fontSize: {
      xs: '0.8rem',
      sm: theme.typography.body1.fontSize
    },
  });

  return (
    <Box component='strong' display={variant === 'column' ? 'block' : 'flex'} alignItems={'center'} >
      {!paymentFrom && !paymentTo && <T textAlign='end' sx={textStyle} >Зарплата не указана</T>}
      {paymentFrom ? <T whiteSpace='nowrap' textAlign='end' sx={textStyle} >от <b>{paymentFrom}</b></T> : ''}
      {showDash && <T whiteSpace="nowrap" mx={1}>–</T>}
      {paymentTo ? <T whiteSpace='nowrap' textAlign='end' sx={textStyle} >до <b>{paymentTo}</b></T> : ''}
    </Box>
  );
}
