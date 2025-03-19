import { Box, Card, Divider } from '@mui/material';
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
    <Card css={vacancyCardStyle} >
      <Box sx={{display: 'flex'}} >
        <VacancyFeatures vacancy={vacancy} />
        <Divider orientation='vertical' flexItem variant='middle' />
        <VacancyDetails vacancy={vacancy} />
      </Box>
      <Divider orientation='vertical' flexItem variant='middle' />
      <Box sx={{display: 'flex'}} >
        <VacancyAdditional vacancy={vacancy} />
      </Box>
    </Card>
  );
}
