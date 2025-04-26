import { Box, CardContent, CardHeader, Divider, Typography as T, useMediaQuery } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { ExpandableText, VisuallyHiddenTypography } from '@shared/ui';
import { VacancySource } from '../../VacancySource/ui/VacancySource';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useTheme } from '@mui/material/styles';
import { blendColors } from '@shared/lib';
import { ThemesContext } from '@shared/ui';
import { useContext } from 'react';
import { VacancyFeatures } from './VacancyFeatures';
import { VacancyPayment } from './VacancyPayment';
import { getDetailsLabel } from './getDetailsLabel';

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
    <Box display='flex' flexDirection='column' flexGrow={1} >
      <Box display='flex' >
        <VisuallyHiddenTypography variant='h3' >{vacancy.profession}</VisuallyHiddenTypography>
        <CardHeader
          tabIndex={0}
          sx={{
            pb: 0,
            pt: {xs: 1.5, sm: 2},
            pl: {xs: 1, sm: 2},
            pr: {xs: 0, sm: 2},
            flexGrow: 1,
            '&:focus-visible': {
              outline: `none`,
              backgroundColor: theme.palette.action.focus
            },
            transition: 'background 0.2s'
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
              aria-hidden='true'
            >
              {vacancy.profession}
            </T>
          }
          subheader={
            <Box pl={1} aria-hidden='true' >
              {!isSmUp && <VacancyPayment vacancy={vacancy} variant='row' />}
              <Box textAlign='start' display='flex' >
                <T sx={{fontSize: {xs: '0.7em', sm: theme.typography.body1.fontSize}}} aria-hidden='true' >{vacancy.firmName}</T>
                <Divider sx={{mx: {xs: 1, sm: 2}}} orientation='vertical' flexItem />
                <T sx={{fontSize: {xs: '0.7em', sm: theme.typography.body1.fontSize}}} aria-hidden='true' >{vacancy.town}</T>
              </Box>
            </Box>
          }
          aria-label={getDetailsLabel(vacancy, howLongAgo)}
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
            ),
            ariaLabel: 'Описание вакансии'
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
