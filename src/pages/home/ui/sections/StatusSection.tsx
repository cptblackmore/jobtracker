import { Box, Container, SxProps } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { SourcesStatusTable } from '@widgets/SourcesStatusTable';
import { homePageElementsIds } from '@shared/ui';

interface Props {
  sectionStyle: SxProps
}

export const StatusSection: React.FC<Props> = ({ sectionStyle }) => {
  return (
    <Box 
      component='section' 
      sx={sectionStyle}
      role='region'
      aria-labelledby={homePageElementsIds.sourcesStatusHeading}
    >
      <Container maxWidth='sm' >
        <SectionTitle id={homePageElementsIds.sourcesStatusHeading} title='Статус источников вакансий' />
        <SourcesStatusTable />
      </Container>
    </Box>
  );
}
