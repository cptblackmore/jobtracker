import { Box, Card, Divider } from '@mui/material';
import { Vacancy } from '@entities/Vacancy';
import { vacancyCardStyle } from './styles';
import { VacancyFeatures } from './VacancyFeatures';
import { VacancyDetails } from './VacancyDetails';
import { VacancyAdditional } from './VacancyAdditional';

interface Props {
  data: Vacancy;
}

export const VacancyCard: React.FC<Props> = ({ data }) => {
  return (
    <Card css={vacancyCardStyle} >
      <Box sx={{display: 'flex'}} >
        <VacancyFeatures data={data} />
        <Divider orientation='vertical' flexItem variant='middle' />
        <VacancyDetails data={data} />
      </Box>
      <Divider orientation='vertical' flexItem variant='middle' />
      <Box sx={{display: 'flex'}} >
        <VacancyAdditional data={data} />
      </Box>
    </Card>
  );
}
