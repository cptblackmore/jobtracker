import { Box, Typography } from "@mui/material";

interface Props {
  paymentFrom: string | null;
  paymentTo: string | null;
}

export const VacancyPayment: React.FC<Props> = ({ paymentFrom, paymentTo }) => {
  return (
    <Box>
      {!paymentFrom && !paymentTo && 'Зарплата не указана'}
      {paymentFrom ? <Typography whiteSpace='nowrap' textAlign='end'>от <b>{paymentFrom}</b></Typography> : ''}
      {paymentTo ? <Typography whiteSpace='nowrap' textAlign='end'>до <b>{paymentTo}</b></Typography> : ''}
    </Box>
  );
};
