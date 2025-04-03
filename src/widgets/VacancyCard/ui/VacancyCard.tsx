import { Box, Card, CardActions, Divider, Fade, useMediaQuery, useTheme } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { VacancyFeatures } from './VacancyFeatures';
import { VacancyDetails } from './VacancyDetails';
import { VacancyAdditional } from './VacancyAdditional';
import { ExternalLinkButton } from '@shared/ui';

interface Props {
  vacancy: Vacancy;
}

export const VacancyCard: React.FC<Props> = ({ vacancy }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fade in timeout={200} >
      <Card sx={{display: isSm ? 'block' : 'flex', width: '100%'}} >
        <Box display='flex' flexGrow={1} >
          {!isSm && <VacancyFeatures vacancy={vacancy} />}
          {!isSm && <Divider orientation='vertical' flexItem variant='middle' />}
          <VacancyDetails vacancy={vacancy} />
        </Box>
        {!isSm && <Divider orientation='vertical' flexItem variant='middle' />}
        {!isSm && <VacancyAdditional vacancy={vacancy} />}
        {isSm && (
          <>
            <Divider variant='middle' />
            <CardActions sx={{justifyContent: 'center', py: 0.5}} >
              <ExternalLinkButton 
                text='Подробнее'
                variant='text'
                size={isSm ? 'small' : 'medium'}
                link={vacancy.link}
                sx={{ width: '100%'}}
            />
            </CardActions>
          </>
        )}
      </Card>
    </Fade>
  );
}
