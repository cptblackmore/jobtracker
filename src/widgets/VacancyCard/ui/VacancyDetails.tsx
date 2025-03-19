import { Box, CardActions, CardContent, CardHeader, Divider, Typography as T } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { ExpandableText } from '@shared/ui';
import { VacancySource } from './VacancySource/VacancySource';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  vacancy: Vacancy;
}

export const VacancyDetails: React.FC<Props> = ({ vacancy }) => {
  const datePublished = new Date(vacancy.datePublished);
  const howLongAgo = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });

  return (
    <Box>        
      <CardHeader
        sx={{paddingBottom: 0}}
        title={
          <T variant='h5' textAlign='start' paddingLeft={1} >
            {vacancy.profession}
          </T>
        }
        subheader={
          <Box paddingLeft={1} textAlign='start' display='flex' >
            <T>{vacancy.firmName}</T>
            <Divider sx={{marginLeft: '1em', marginRight: '1em'}} orientation='vertical' flexItem />
            <T>{vacancy.town}</T>
          </Box>
        }
      />
      <CardContent sx={{paddingBottom: 0}} >
        <ExpandableText text={vacancy.description} options={{timeout: 0}} />
      </CardContent>
      <CardActions>
        <T paddingLeft={2} display='flex' gap='0.3em' >
          {howLongAgo} на <VacancySource source={vacancy.source} />
        </T>
      </CardActions>
    </Box>
  );
}
