import { Box, Container } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { SourcesStatusTable } from '@widgets/SourcesStatusTable';

export const StatusSection: React.FC = () => {
  return (
    <Box component='section' >
      <Container maxWidth='md' >
        <Box py={8} maxWidth='sm' m='auto' width='100%' >
          <SectionTitle title='Статус источников вакансий' />
          <SourcesStatusTable />
        </Box>
      </Container>
    </Box>
  );
}
