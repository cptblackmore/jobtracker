import { Box, Card, Divider, Fade } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { vacancyCardStyle } from './styles';
import { VacancyFeatures } from './VacancyFeatures';
import { VacancyDetails } from './VacancyDetails';
import { VacancyAdditional } from './VacancyAdditional';

interface Props {
  vacancy: Vacancy;
}

export const VacancyCard: React.FC<Props> = ({ vacancy }) => {
  return (
    <Fade in timeout={200} css={vacancyCardStyle} >
      <Card>
        <Box display='flex' flexGrow={1} >
          <VacancyFeatures vacancy={vacancy} />
          <Divider orientation='vertical' flexItem variant='middle' />
          <VacancyDetails vacancy={vacancy} />
        </Box>
        <Divider orientation='vertical' flexItem variant='middle' />
        <VacancyAdditional vacancy={vacancy} />
      </Card>
    </Fade>
  );
}
