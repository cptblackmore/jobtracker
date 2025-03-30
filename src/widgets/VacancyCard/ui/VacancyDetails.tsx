import { Box, CardContent, CardHeader, Divider, Typography as T } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { ExpandableText } from '@shared/ui';
import { VacancySource } from '../../VacancySource/ui/VacancySource';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTheme } from '@mui/material/styles';
import { blendColors } from '@shared/lib';
import { ThemesContext } from '@shared/ui/theme/ThemesContext';
import { useContext } from 'react';

interface Props {
  vacancy: Vacancy;
}

export const VacancyDetails: React.FC<Props> = ({ vacancy }) => {
  const datePublished = new Date(vacancy.datePublished);
  const howLongAgo = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });
  const { config } = useContext(ThemesContext);
  const theme = useTheme();

  return (
    <Box>        
      <CardHeader
        sx={{paddingBottom: 0}}
        title={
          <T component='h3' variant='h5' textAlign='start' paddingLeft={1} >
            {vacancy.profession}
          </T>
        }
        subheader={
          <Box paddingLeft={1} textAlign='start' display='flex' >
            <T component='h4' >{vacancy.firmName}</T>
            <Divider sx={{marginLeft: '1em', marginRight: '1em'}} orientation='vertical' flexItem />
            <T component='h4' >{vacancy.town}</T>
          </Box>
        }
      />
      <CardContent sx={{'&:last-child': {paddingBottom: 1}}} >
        <ExpandableText 
          text={vacancy.description} 
          options={{
            timeout: 0, 
            fadingColor: blendColors(
              theme.palette.background.paper, 
              config.muiPaperOverlay.bgcolor, 
              config.muiPaperOverlay.opacity
            )
          }} 
        />
        <T display='flex' px={1} pt={2} gap='0.3em' >
          {howLongAgo} на <VacancySource source={vacancy.source} />
        </T>
      </CardContent>
    </Box>
  );
}
