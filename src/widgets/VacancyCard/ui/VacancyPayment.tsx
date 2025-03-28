import { Box, Typography as T } from '@mui/material';

interface Props {
  paymentFrom: string | null;
  paymentTo: string | null;
}

export const VacancyPayment: React.FC<Props> = ({ paymentFrom, paymentTo }) => {
  return (
    <Box>
      {!paymentFrom && !paymentTo && <T textAlign='end' >Зарплата не указана</T>}
      {paymentFrom ? <T whiteSpace='nowrap' textAlign='end' >от <b>{paymentFrom}</b></T> : ''}
      {paymentTo ? <T whiteSpace='nowrap' textAlign='end' >до <b>{paymentTo}</b></T> : ''}
    </Box>
  );
}
