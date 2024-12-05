import { Box, CardActions, CardContent } from '@mui/material';
import { Vacancy } from '@shared/api';
import { VacancyPayment } from './VacancyPayment';
import { ExternalLinkButton } from '@shared/ui';
import { formatNumberByCurrency } from '@shared/lib';

interface Props {
  data: Vacancy;
}

export const VacancyAdditional: React.FC<Props> = ({ data }) => {
  const paymentFrom = data.paymentFrom ? formatNumberByCurrency(data.paymentFrom, data.currency) : null;
  const paymentTo = data.paymentTo ? formatNumberByCurrency(data.paymentTo, data.currency) : null;

  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' >
      <CardContent>
        <VacancyPayment paymentFrom={paymentFrom} paymentTo={paymentTo} />
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}} >
        <ExternalLinkButton text={'Подробнее'} link={data.link} />
      </CardActions>
    </Box>
  );
};
