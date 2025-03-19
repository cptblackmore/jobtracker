import { Box, CardActions, CardContent } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { VacancyPayment } from './VacancyPayment';
import { ExternalLinkButton } from '@shared/ui';
import { formatNumberByCurrency } from '@shared/lib';

interface Props {
  vacancy: Vacancy;
}

export const VacancyAdditional: React.FC<Props> = ({ vacancy }) => {
  const paymentFrom = vacancy.paymentFrom ? formatNumberByCurrency(vacancy.paymentFrom, vacancy.currency) : null;
  const paymentTo = vacancy.paymentTo ? formatNumberByCurrency(vacancy.paymentTo, vacancy.currency) : null;

  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' >
      <CardContent>
        <VacancyPayment paymentFrom={paymentFrom} paymentTo={paymentTo} />
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}} >
        <ExternalLinkButton text={'Подробнее'} link={vacancy.link} />
      </CardActions>
    </Box>
  );
}
