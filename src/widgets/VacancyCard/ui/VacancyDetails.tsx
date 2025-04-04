import { Box, CardContent, CardHeader, Divider, Typography as T, useMediaQuery } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { ExpandableText } from '@shared/ui';
import { VacancySource } from '../../VacancySource/ui/VacancySource';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTheme } from '@mui/material/styles';
import { blendColors } from '@shared/lib';
import { ThemesContext } from '@shared/ui';
import { useContext } from 'react';
import { VacancyFeatures } from './VacancyFeatures';
import { VacancyPayment } from './VacancyPayment';

interface Props {
  vacancy: Vacancy;
}

export const VacancyDetails: React.FC<Props> = ({ vacancy }) => {
  const datePublished = new Date(vacancy.datePublished);
  const howLongAgo = formatDistanceToNow(datePublished, { addSuffix: true, locale: ru });
  const { config } = useContext(ThemesContext);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Box display='flex' >
        <CardHeader
          sx={{
            pb: 0,
            pt: {xs: 1.5, sm: 2},
            pl: {xs: 1, sm: 2},
            pr: {xs: 0, sm: 2},
            flexGrow: 1
          }}
          title={
            <T 
              component='h3' 
              variant='h5' 
              textAlign='start' 
              pl={1}
              sx={{
                fontSize: {
                  xs: '1.1em',
                  sm: {fontSize: theme.typography.h5.fontSize}
                }
              }}
            >
              {vacancy.profession}
            </T>
          }
          subheader={
            <Box pl={1} >
              {!isSmUp && <VacancyPayment vacancy={vacancy} variant='row' />}
              <Box textAlign='start' display='flex' >
                <T component='h4' sx={{fontSize: {xs: '0.7em', sm: theme.typography.body1.fontSize}}} >{vacancy.firmName}</T>
                <Divider sx={{mx: {xs: 1, sm: 2}}} orientation='vertical' flexItem />
                <T component='h4' sx={{fontSize: {xs: '0.7em', sm: theme.typography.body1.fontSize}}} >{vacancy.town}</T>
              </Box>
            </Box>
          }
        />
        {!isSmUp && <VacancyFeatures vacancy={vacancy} />}
      </Box>
      <CardContent sx={{'&:last-child': {pb: 1}, pt: {xs: 1, sm: 2}}} >
        <ExpandableText 
          text={vacancy.description || 'Описание отсутствует.'} 
          options={{
            timeout: 0, 
            fadingColor: blendColors(
              theme.palette.background.paper, 
              config.muiPaperOverlay.bgcolor, 
              config.muiPaperOverlay.opacity
            )
          }} 
        />
        <T 
          display='flex' 
          px={isSmUp ? 1 : 0} 
          pt={2} 
          gap='0.3em'
          sx={{
            fontSize: {
              xs: '0.7em',
              sm: theme.typography.body1.fontSize
            }
          }}
        >
          {howLongAgo} на <VacancySource source={vacancy.source} />
        </T>
      </CardContent>
    </Box>
  );
}
