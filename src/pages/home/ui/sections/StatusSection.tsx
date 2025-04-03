import { Box, Container, SxProps } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { SourcesStatusTable } from '@widgets/SourcesStatusTable';

interface Props {
  sectionStyle: SxProps
}

export const StatusSection: React.FC<Props> = ({ sectionStyle }) => {
  return (
    <Box component='section' sx={sectionStyle} >
      <Container maxWidth='sm' >
        <SectionTitle title='Статус источников вакансий' />
        <SourcesStatusTable />
      </Container>
    </Box>
  );
}
