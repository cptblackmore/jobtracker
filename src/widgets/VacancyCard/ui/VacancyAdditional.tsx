import { Box, CardActions, CardContent } from '@mui/material';
import { sourcesRegistry, Vacancy } from '@entities/Vacancy';
import { VacancyPayment } from './VacancyPayment';
import { ExternalLinkButton } from '@shared/ui';

interface Props {
  vacancy: Vacancy;
}

export const VacancyAdditional: React.FC<Props> = ({ vacancy }) => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' >
      <CardContent>
        <VacancyPayment vacancy={vacancy} />
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}} >
        <ExternalLinkButton 
          text={'Подробнее'} 
          variant='text'
          link={vacancy.link} 
          ariaLabel={'Переход на страницу вакансии ' + sourcesRegistry[vacancy.source].url.frontendDomain}
        />
      </CardActions>
    </Box>
  );
}
