import { Box, CardActions, CardContent, CardHeader, Divider, Typography as T } from '@mui/material';
import { Vacancy } from '@shared/api';
import { ExpandableText } from '@shared/ui';
import { VacancySource } from './VacancySource/VacancySource';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  data: Vacancy;
}

export const VacancyDetails: React.FC<Props> = ({ data }) => {
  const datePublished = new Date(data.datePublished);
  const howLongAgo = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });

  return (
    <Box>        
      <CardHeader
        sx={{paddingBottom: 0}}
        title={
          <T variant='h5' textAlign='start' paddingLeft={1} >
            {data.profession}
          </T>
        }
        subheader={
          <Box paddingLeft={1} textAlign='start' display='flex' >
            <T>{data.firmName}</T>
            <Divider sx={{marginLeft: '1em', marginRight: '1em'}} orientation='vertical' flexItem />
            <T>{data.town}</T>
          </Box>
        }
      />
      <CardContent sx={{paddingBottom: 0}} >
        <ExpandableText text={data.description} />
      </CardContent>
      <CardActions>
        <T paddingLeft={2} display='flex' gap='0.3em' >
          {howLongAgo} на <VacancySource source={data.source} />
        </T>
      </CardActions>
    </Box>
  );
};
