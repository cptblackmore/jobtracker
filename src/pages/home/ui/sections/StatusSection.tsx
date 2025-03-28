import { Box, Container } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { SourcesStatusList } from '@widgets/SourcesStatusList';

export const StatusSection: React.FC = () => {
  return (
    <Box component='section' >
      <Container maxWidth='md' >
        <Box py={8} maxWidth='sm' m='auto' width='100%' >
          <SectionTitle title='Статус источников вакансий' />
          <SourcesStatusList />
        </Box>
      </Container>
    </Box>
  );
}
